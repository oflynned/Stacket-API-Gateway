const User = `
  type User {
    _id: String!
    name: String!
    email: String!
    ownerOf: [Organisation]
    memberOf: [Organisation]
  }
`;

export const types = () => [User];

export const typeResolvers = {};
