const User = `
  type User {
    _id: String!
    name: String!
    email: String!
  }
`;

export const types = () => [User];

export const typeResolvers = {};
