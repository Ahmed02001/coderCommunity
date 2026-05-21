import express from 'express';
import asyncHandler from 'express-async-handler';
import { SignInHandler, SignUpHandler } from '../Handlers/UserHandler.ts';

const router = express();

router.post('/signup', asyncHandler(SignUpHandler));
router.post('/signin', asyncHandler(SignInHandler));

export default router;
