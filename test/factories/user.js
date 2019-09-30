import factory from "./factory";
import User from "../models/user/user";
import { generateHmacFromToken, hashPassword } from "../common/hashing";

const Faker = require("faker");

const generatePayload = () => {
  return {
    name: Faker.name.firstName() + " " + Faker.name.lastName(),
    dob: "01/01/1990",
    email: Faker.internet.email(),
    sex: "male",
    fcmToken: "token"
  };
};

factory.define("user", User, generatePayload());

export const seedUser = async (overrides = {}, password = Faker.internet.password(), verified = true) => {
  const hash = await hashPassword(password);
  const user = await factory.build("user",
    Object.assign({}, generatePayload(), overrides, {
      hash,
      verified,
      verificationToken: overrides.verificationToken ? await generateHmacFromToken(overrides.verificationToken) : "token",
      passwordResetPin: null,
      passwordResetPinExpiryTime: null,
      timeLastExercised: null
    }));

  return user.save();
};

export const generateUser = async (overrides = {}, verified = true) => {
  const user = await factory.build("user", Object.assign({}, overrides, { verified }));
  return user.toJSON();
};
