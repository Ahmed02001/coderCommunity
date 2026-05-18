import type { Like } from '../../types.ts';

export interface ILikeDao {
  createLike(like: Like): Promise<void>;
}
