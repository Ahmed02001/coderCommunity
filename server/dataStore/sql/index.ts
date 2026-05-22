import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { type IDataStore } from '../index.ts';
import type { Like, Post, User, Comment } from '../../types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class sqlDataStore implements IDataStore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async openDb() {
    // open the database
    this.db = await open({
      filename: path.join(__dirname, '/coderCommunity.sqlite'),
      driver: sqlite3.Database,
    } as any);

    this.db.run('PRAGMA foreign_keys = ON;');

    await this.db.migrate({
      // force: 'true',
      // table: '',
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id, firstName, lastName, userName, email, password) VALUES (?,?,?,?,?,?)',
      user.id,
      user.firstName,
      user.lastName,
      user.userName,
      user.email,
      user.password
    );
  }
  async getUserById(id: string): Promise<User | undefined> {
    return await this.db.get<User>(`SELECT * FROM users WHERE id=?`, id);
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.db.get<User>(`SELECT * FROM users WHERE email=?`, email);
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    return await this.db.get<User>(`SELECT * FROM users WHERE userName=?`, username);
  }
  async getAllPosts(): Promise<Post[]> {
    return await this.db.all<Post[]>('SELECT * FROM posts');
  }
  async createPost(post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO posts (id, userId, title, url, postedAt) VALUES (?,?,?,?,?)',
      post.id,
      post.userId,
      post.title,
      post.url,
      post.postedAt
    );
  }
  async getPostById(postId: string): Promise<Post | undefined> {
    return await this.db.get<Post>(`SELECT * FROM posts WHERE id=?`, postId);
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
