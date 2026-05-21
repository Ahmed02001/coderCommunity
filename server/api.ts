import { PassThrough } from 'stream';
import type { Comment, Like, Post, User } from './types.ts';
//post API
export interface getAllPostsRequest {}
export interface getAllPostsResponse {
  posts: Post[];
}

export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export interface createPostResponse {}

export interface getPostRequest {}
export interface getPostResponse {
  post: Post;
}

export interface deletePostRequest {
  postId: string;
}
export interface deletePostResponse {}

//User API

export type SignUpRequest = Pick<
  User,
  'firstName' | 'lastName' | 'userName' | 'email' | 'password'
>;
export interface SignUpResponse {}

export interface SignInRequest {
  login: string;
  password: string;
}
export type SignInResponse =
  | Pick<User, 'firstName' | 'lastName' | 'userName' | 'email' | 'id'>
  | any;

//Comment
// export type createCommentRequest  = Pick<Comment, "userId" | "postId" | "comment">
// export interface createCommentResponse{}

// export interface getCommentsRequest{}
// export interface getCommentsResponse{
//   comment: Comment[]
// }
