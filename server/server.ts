import express from 'express';
import { initDb } from './dataStore/index.ts';
import { errorHandler } from './middlewares/errorMiddleware.ts';
import { requsetLoggerMiddleware } from './middlewares/loggerMiddleware.ts';
import postRouter from './routes/post.routes.ts';
import userRouter from './routes/user.routes.ts';
import { AuthMiddleware } from './middlewares/authMiddleware.ts';

(async () => {
  await initDb();

  const app = express();
  app.use(express.json() as any);
  app.use(requsetLoggerMiddleware);

  //Users
  app.use('/v1/users', userRouter);

  //auth middleware
  app.use(AuthMiddleware);

  //Posts
  app.use('/v1/posts', postRouter);

  app.use(errorHandler);

  app.listen(3122);
})();
