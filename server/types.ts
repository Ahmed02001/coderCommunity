import type { Request, Response, NextFunction } from 'express';

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

export type expressHandler<Req, Res> = (
  req: Request<any, Res, Req, any>,
  res: Response<Res>,
  next: NextFunction
) => void | Promise<void>;
