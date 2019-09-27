const Mutation = `
  extend type Mutation {
    createUser(name: String, email: String): User
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    createUser: () => ({})
  }
};
