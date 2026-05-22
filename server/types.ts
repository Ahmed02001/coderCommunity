import type { NextFunction, Request, Response } from 'express';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface Post {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: number;
}

export interface Like {
  userId: string;
  postId: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  postedAt: number;
}

export interface JWTObject {
  userId: string;
}

type WithError<T> = T & { error: string };
export type expressHandler<Req, Res> = (
  req: Request<string, Partial<WithError<Res>>, Partial<Req>, any>,
  res: Response<Partial<WithError<Res>>>,
  next: NextFunction
) => void | Promise<void>;
