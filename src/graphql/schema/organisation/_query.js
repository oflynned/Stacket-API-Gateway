import User from '../../../models/user/user';

const Query = `
  extend type Query {
    findUser(email: String!): User
    findUsers(organisationId: String!): [User]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    findUser: async (_, { email }) => User.findByEmail(email),
    findUsers: async (_, organisationId) => User.findByOrganisation(organisationId)
  }
};
