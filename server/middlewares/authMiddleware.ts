import { verifyJWT } from '../auth.ts';
import { db } from '../dataStore/index.ts';
import type { expressHandler, JWTObject } from '../types.ts';

export const AuthMiddleware: expressHandler<any, any> = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
  }
  let data: JWTObject;
  try {
    data = verifyJWT(token as string);
    const userId = JSON.parse(data.payload).userId;
    const user = await db.getUserById(userId);

    if (!user) throw 'user not found';

    res.locals.userId = user.id;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Bad Token ' });
  }
};
