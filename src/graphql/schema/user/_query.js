import mockData from '../../data/mockUserData';

const Query = `
  extend type Query {
    users: [User]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    users: () => mockData
  }
};
