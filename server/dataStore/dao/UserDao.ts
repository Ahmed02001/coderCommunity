import type { User } from '../../types.ts';

export interface IUserDao {
  createUser(user: User): Promise<void>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
}
