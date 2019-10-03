const Organisation = `
  type Organisation {
    _id: String!
    name: String!
    ownedBy: User
    members: [User]
  }
`;

export const types = () => [Organisation];

export const typeResolvers = {};
