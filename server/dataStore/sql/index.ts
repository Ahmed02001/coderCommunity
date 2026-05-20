import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import type { IDataStore } from '../index';
import type { Like, Post, User, Comment } from '../../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class sqlDataStore implements IDataStore {
  public async openDb() {
    // open the database
    const db = await open({
      filename: path.join(__dirname, '/coderCommunity.sqlite'),
      driver: sqlite3.Database,
    } as any);

    await db.migrate({
      // force: 'true',
      // table: '',
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }

  createUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getAllPosts(): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  createPost(post: Post): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getPostById(postId: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  deletePost(postId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createLike(like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getComments(postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(commentID: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

function sqliteOpen(arg0: any) {
  throw new Error('Function not implemented.');
}
