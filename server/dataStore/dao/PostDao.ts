import type { Post } from '../../types.ts';

export interface IPostDao {
  getAllPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<void>;
  getPostById(postId: string): Promise<Post | undefined>;
  deletePost(postId: string): Promise<void>;
}
