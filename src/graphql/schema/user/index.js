import { types, typeResolvers } from './_type';
import { queryTypes, queryResolvers } from './_query';

export default {
  types: () => [types, queryTypes],
  resolvers: Object.assign(queryResolvers, typeResolvers),
};
