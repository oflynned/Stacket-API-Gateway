import { Document } from 'camo';

class User extends Document {
  constructor() {
    super();
    this.schema({
      name: String,
      email: String
    });
  }

  static collectionName() {
    return 'users';
  }
}

export default User;
