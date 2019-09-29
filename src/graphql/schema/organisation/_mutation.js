import {
  createOrganisation,
  deleteOrganisation,
  updateOrganisation
} from '../../controllers/organisation';

const Mutation = `
  extend type Mutation {
    createOrganisation(name: String!, ownerId: String!): Organisation
    updateOrganisation(name: String): Organisation
    deleteOrganisation(_id: String!): Organisation
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    createOrganisation: async (_, args) => createOrganisation(args),
    updateOrganisation: async (_, args) => updateOrganisation(args),
    deleteOrganisation: async (_, { _id }) => deleteOrganisation(_id)
  }
};
