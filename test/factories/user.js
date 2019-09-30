import { factory } from 'factory-girl';

import User from '../../src/models/user/user';
import { hashPassword } from '../../src/common/hashing';

const Faker = require('faker');

const generatePayload = () => ({
  name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
  email: Faker.internet.email(),
});

factory.define('user', User, generatePayload());

export const seedUser = async (overrides = {}, password = Faker.internet.password()) => {
  const hash = await hashPassword(password);
  const user = await factory.build(
    'user',
    Object.assign({}, generatePayload(), overrides, { hash })
  );

  return user.save();
};

export const generateUser = async (overrides = {}, verified = true) => {
  const user = await factory.build('user', Object.assign({}, overrides, { verified }));
  return user.toJSON();
};
