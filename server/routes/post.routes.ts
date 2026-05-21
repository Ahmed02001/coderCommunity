import express from 'express';
import asyncHandler from 'express-async-handler';
import { createPosthandler, getAllPostsHandler, getPostHandler } from '../Handlers/PostHandler.ts';

const router = express();

router.get('/v1/posts', asyncHandler(getAllPostsHandler));
router.get('/v1/posts/:id', asyncHandler(getPostHandler));
router.post('/v1/posts', asyncHandler(createPosthandler));

export default router;
