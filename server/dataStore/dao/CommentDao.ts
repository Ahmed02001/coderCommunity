import type { Comment } from '../../types.ts';

export interface ICommentDao {
  createComment(comment: Comment): Promise<void>;
  getComments(postId: string): Promise<Comment[]>;
  deleteComment(commentID: string): Promise<void>;
}
