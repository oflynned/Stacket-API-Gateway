import User from '../models/user/user';
import { hashPassword } from '../common/hashing';

export const createUser = async ({ headers: { email, password }, body }) => {
  const hash = await hashPassword(password);
  const args = Object.assign(
    {},
    body,
    {
      hash,
      email
    }
  );

  return User.create(args)
    .save();
};

export const updateUser = async (args) => {
  return args;
};

export const deleteUser = async (userId) => {
  return { userId };
};
