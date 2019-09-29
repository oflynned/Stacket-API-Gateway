import { createUser, deleteUser, updateUser } from '../../../controllers/user';

const Mutation = `
  extend type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(name: String): User
    updateEmail(email: String!): User
    updatePassword(password: String!): User
    deleteUser(_id: String!): User
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    createUser: async (_, args) => createUser(args),
    updateUser: async (_, args) => updateUser(args),
    deleteUser: async (_, { _id }) => deleteUser(_id)
  }
};
