import { deleteUser, updateUser } from '../../../controllers/user';

const Mutation = `
  extend type Mutation {
    updateUser(name: String): User
    updateEmail(email: String!): User
    updatePassword(password: String!): User
    deleteUser(_id: String!): User
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    updateUser: async (_, args) => updateUser(args),
    deleteUser: async (_, { _id }) => deleteUser(_id)
  }
};
