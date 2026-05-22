import express from 'express';
import asyncHandler from 'express-async-handler';
import { createPosthandler, getAllPostsHandler, getPostHandler } from '../Handlers/PostHandler.ts';

const router = express();

router.get('/', asyncHandler(getAllPostsHandler));
router.get('/:id', asyncHandler(getPostHandler));
router.post('/', asyncHandler(createPosthandler));

export default router;
