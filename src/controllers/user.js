import User from '../models/user/user';

export const createUser = async (args) => {
  const user = await User.findOne({ email: args.email });
  if (user !== null) {
    return user;
  }

  return User
    .create(args)
    .save();
};

export const updateUser = async (args) => {
  return args;
};

export const deleteUser = async (userId) => {
  return { userId };
};
