import express from 'express';
import type { ErrorRequestHandler } from 'express';
import { createPosthandler, getAllPostsHandler, getPostHandler } from './Handlers/PostHandler.ts';

import asyncHandler from 'express-async-handler';

const app = express();

app.use(express.json() as any);

const requsetLoggerMiddelware = (req: any, res: any, next: any) => {
  console.log(`Method : ${req.method}, body : ${JSON.stringify(req.body)}`);
  next();
};

app.use(requsetLoggerMiddelware);

app.get('/v1/posts', asyncHandler(getAllPostsHandler));
app.get('/v1/posts/:id', asyncHandler(getPostHandler));

app.post('/v1/posts', asyncHandler(createPosthandler));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('uncaugh Error ', err);
  return res.status(500).send('oops!!');
};
app.use(errorHandler);

app.listen(3020);
