import jwt from 'jsonwebtoken';
import type { JWTObject } from './types.ts';
import ENV from './lib/env.ts';

export function signJWT(user: JWTObject) {
  return jwt.sign({ payload: JSON.stringify(user) }, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: '2d',
  });
}

export function verifyJWT(token: string): JWTObject {
  return jwt.verify(token, getJwtSecret()) as JWTObject;
}

function getJwtSecret() {
  if (!ENV.SECRT_JWT) {
    console.error('Missing JWT Secret');
    process.exit(1);
  }
  return ENV.SECRT_JWT;
}
