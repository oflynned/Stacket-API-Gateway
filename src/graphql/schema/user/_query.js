import User from '../../../models/user';

const Query = `
  extend type Query {
    users(name: String): [User]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    users: async (_, args) => {
      const hasQuery = Object.keys(args).length > 0;
      return hasQuery ? User.find(args) : User.find();
    }
  }
};
