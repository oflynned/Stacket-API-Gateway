import User from '../../src/models/user/user';
import { hashPassword } from '../../src/common/hashing';

const Faker = require('faker');

const generatePayload = () => ({
  name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
  email: Faker.internet.email(),
});

export const seedUser = async (overrides = {}, password = Faker.internet.password()) => {
  const hash = await hashPassword(password);
  const args = Object.assign({}, generatePayload(), overrides, { hash });
  return User.create(args)
    .save();
};

export const generateUser = (overrides = {}) =>
  Object.assign({}, generatePayload(), overrides);
