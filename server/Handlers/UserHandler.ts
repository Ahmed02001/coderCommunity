import type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api.ts';
import { db } from '../dataStore/index.ts';
import { signJWT } from '../auth.ts';
import type { expressHandler } from '../types.ts';
import bcrypt from 'bcrypt';

export const SignUpHandler: expressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res
      .status(400)
      .send({ error: 'Missing required fields: userName, email and password are required' });
    return;
  }

  const existing = (await db.getUserByEmail(email)) || (await db.getUserByUsername(userName));

  if (existing) res.status(403).send({ error: 'User already exists' });

  const user = {
    id: crypto.randomUUID(),
    firstName: firstName as string,
    lastName: lastName as string,
    userName: userName,
    email: email,
    password: await hashPassword(password),
  };

  const token = signJWT({ userId: user.id });

  await db.createUser(user);

  res.status(200).send({ token: token });
};

export const SignInHandler: expressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res
      .status(400)
      .send({ error: 'Missing required fields: userName, email and password are required' });
    return;
  }

  const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  const isCorrect = await chackPassword(password, existing!.password);
  if (!existing || !isCorrect) {
    res.status(403).send({ error: 'User does not exist or wrong password' });
    return;
  }
  const token = signJWT({ userId: existing.id });

  res.status(200).send({
    user: {
      id: existing.id,
      firstName: existing.firstName,
      lastName: existing.lastName,
      userName: existing.userName,
      email: existing.email,
    },
    token: token,
  });
};

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

async function chackPassword(plainTeaxt: string, hashPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainTeaxt, hashPassword);
}
