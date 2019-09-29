import Organisation from '../../../models/organisation/organisation';

const Query = `
  extend type Query {
    findOrganisation(_id: String!): Organisation
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    findOrganisation: async (_, { _id }) => Organisation.findById(_id)
  }
};
