import type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api.ts';
import { db } from '../dataStore/index.ts';
import type { expressHandler, User } from '../types.ts';

export const SignUpHandler: expressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res
      .status(400)
      .send({ error: 'Missing required fields: userName, email and password are required' });
    return;
  }

  const existing = (await db.getUserByEmail(email)) || (await db.getUserByUsername(userName));

  if (existing) res.status(403).send('User already exists');

  await db.createUser({
    id: crypto.randomUUID(),
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: password,
  });

  res.status(200).send({ msg: 'Sign Up Successfully' });
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

  if (!existing || password !== existing.password) {
    res.status(403).send({ error: 'User does not exist or wrong password' });
    return;
  }

  res.status(200).send({
    id: existing.id,
    firstName: existing.firstName,
    lastName: existing.lastName,
    userName: existing.userName,
    email: existing.email,
  });
};
