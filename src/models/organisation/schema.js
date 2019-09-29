import User from '../user/user';

const schema = {
  name: String,
  owner: User,
  members: [User]
};

export default schema;
