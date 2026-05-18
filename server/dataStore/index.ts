import type { ICommentDao } from './dao/CommentDao.ts';
import type { ILikeDao } from './dao/LikeDao.ts';
import type { IPostDao } from './dao/PostDao.ts';
import type { IUserDao } from './dao/UserDao.ts';
import { MemoryDataStore } from './memorydb/index.ts';

export interface IDataStore extends IUserDao, IPostDao, ILikeDao, ICommentDao {}

export const db = new MemoryDataStore();
