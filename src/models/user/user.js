import { Document } from 'camo';

const collection = 'users';

const schema = {
  name: String,
  email: String,
  hash: String
};

class User extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async findByEmail(email) {
    return User.findOne({ email });
  }

  static async findByOrganisation(organisationId) {
    return User.find({ organisationId });
  }

  static collectionName() {
    return collection;
  }
}

export default User;
