import User from '../../src/models/user/user';
import { hashPassword } from '../../src/common/hashing';

const Faker = require('faker');

const generatePayload = () => ({
  name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
  email: Faker.internet.email(),
});

export const seedUser = async (overrides = {}, password = Faker.internet.password()) => {
  const args = await generateUser(overrides, password);
  return User.create(args)
    .save();
};

export const generateUser = async (overrides = {}, password = Faker.internet.password()) => {
  const hash = await hashPassword(password);
  return Object.assign({}, generatePayload(), overrides, { hash });
};
