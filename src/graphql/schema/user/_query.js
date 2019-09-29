import User from '../../../models/user/user';

const Query = `
  extend type Query {
    findUser(email: String!): User
    findUsers: [User]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    findUser: async (_, { email }) => User.findByEmail(email),
    findUsers: async (_, _args) => User.find({})
  }
};
