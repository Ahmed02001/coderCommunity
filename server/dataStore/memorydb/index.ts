import type { IDataStore } from '../index.ts';
import type { User, Post, Like, Comment } from '../../types.ts';

export class MemoryDataStore implements IDataStore {
  private users: User[] = [];
  private posts: Post[] = [];
  private likes: Like[] = [];
  private comments: Comment[] = [];

  createUser(user: User): Promise<void> {
    if (!user) {
      throw new Error('User object is required');
    }
    const emailExists = this.users.some(u => u.email === user.email);
    if (emailExists) {
      throw new Error('Email already exists');
    }
    const userExists = this.users.some(u => u.userName === user.userName);
    if (userExists) {
      throw new Error('userName already exists');
    }
    this.users.push(user);
    return Promise.resolve();
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('Email not found.');
    }
    return Promise.resolve(user);
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    const user = this.users.find(u => u.userName === username);
    if (!user) {
      throw new Error('userName not found.');
    }
    return Promise.resolve(user);
  }

  getAllPosts(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }
  createPost(post: Post): Promise<void> {
    if (!post) {
      throw new Error('User object is required');
    }
    this.posts.push(post);
    return Promise.resolve();
  }
  getPostById(postId: string): Promise<Post | undefined> {
    const post = this.posts.find(post => post.id == postId);
    if (!post) {
      throw new Error(`Post with ID ${postId} Not Found!`);
    }
    return Promise.resolve(post);
  }
  deletePost(postId: string): Promise<void> {
    const postIndex = this.posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    this.posts.splice(postIndex, 1);
    return Promise.resolve();
  }
  createLike(like: Like): Promise<void> {
    if (!like) {
      throw new Error('like is required');
    }
    this.likes.push(like);
    return Promise.resolve();
  }
  createComment(comment: Comment): Promise<void> {
    if (!comment) {
      throw new Error('comment is required');
    }
    this.comments.push(comment);
    return Promise.resolve();
  }
  getComments(postId: string): Promise<Comment[]> {
    const comments = this.comments.filter(post => post.postId === postId);
    if (!comments) {
      throw new Error('comments not found');
    }
    return Promise.resolve(comments);
  }
  deleteComment(commentId: string): Promise<void> {
    const commentIndex = this.comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
      throw new Error('comment not found');
    }
    this.comments.splice(commentIndex, 1);
    return Promise.resolve();
  }
}
