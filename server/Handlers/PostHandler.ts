import type {
  createPostRequest,
  createPostResponse,
  deletePostRequest,
  deletePostResponse,
  getAllPostsRequest,
  getAllPostsResponse,
  getPostRequest,
  getPostResponse,
} from '../api.ts';
import { db } from '../dataStore/index.ts';
import type { expressHandler, Post } from '../types.ts';
import crypto from 'crypto';

export const getAllPostsHandler: expressHandler<getAllPostsRequest, getAllPostsResponse> = async (
  req,
  res
) => {
  res.send({ posts: await db.getAllPosts() });
};
export const getPostHandler: expressHandler<getPostRequest, getPostResponse> = async (req, res) => {
  const post = await db.getPostById(`${req.params.id}`);
  if (!post) {
    res.status(404).send();
    return;
  }
  res.status(200).send({ posts: post });
};

export const createPosthandler: expressHandler<createPostRequest, createPostResponse> = (
  req,
  res
) => {
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    userId: req.body.userId,
    url: req.body.url,
  };
  db.createPost(post);
  res.status(201).send({ post: post });
};

export const deletePostHandler: expressHandler<deletePostRequest, deletePostResponse> = (
  req,
  res
) => { };
