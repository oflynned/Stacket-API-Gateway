import mockData from '../../data/mockUserData';

const resolver = {
  Query: {
    users: () => mockData
  },
  Mutation: {}
};

export default resolver;
