import type { Post } from './types';
//post API
export interface getAllPostsRequest { }
export interface getAllPostsResponse {
  posts: Post[];
}

export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export interface createPostResponse { }

export interface getPostRequest { }
export interface getPostResponse {
  post: Post;
}

export interface deletePostRequest {
  postId: string;
}
export interface deletePostResponse { }


