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
  res.status(200).send({ post: post });
};

export const createPosthandler: expressHandler<createPostRequest, createPostResponse> = async (
  req,
  res
) => {

  const { title, userId, url } = req.body;
  if (!title || !userId) {
    res.status(400).send({ error: 'Missing required fields: title and userId are required' });
    return;
  }


  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title,
    userId,
    url,
  };
  await db.createPost(post);
  res.status(201).send({ post });
};

export const deletePostHandler: expressHandler<deletePostRequest, deletePostResponse> = (
  req,
  res
) => { };
