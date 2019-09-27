import mockData from '../../data/mockUserData';

const Query = `
  extend type Query {
    users(name: String): [User]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    users(_parent, { name }) {
      return mockData.filter(item => item.name === name);
    }
  }
};
