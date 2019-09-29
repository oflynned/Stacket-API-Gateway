const Organisation = `
  type Organisation {
    _id: String!
    name: String!
    owner: User
    members: [User]
  }
`;

export const types = () => [Organisation];

export const typeResolvers = {};
