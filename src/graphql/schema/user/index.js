import { typeResolvers, types } from './_type';
import { queryResolvers, queryTypes } from './_query';
import { mutationResolvers, mutationTypes } from './_mutation';

export default {
  types: () => [types, queryTypes, mutationTypes],
  resolvers: Object.assign(queryResolvers, mutationResolvers, typeResolvers),
};
