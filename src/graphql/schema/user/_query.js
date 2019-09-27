import User from '../../../models/user';

const Query = `
  extend type Query {
    users(name: String): [User]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    users: async (_, { name }) => User.find({ name })
  }
};
