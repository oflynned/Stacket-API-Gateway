import { Document } from 'camo';

import schema from './schema';
import Organisation from '../organisation/organisation';
import { isMatchingPassword } from '../../common/hashing';

const collection = 'users';

class User extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async doesPasswordMatch(email, passwordAttempt) {
    const user = await User.findByEmail(email);
    if (user == null)
      return false;

    return isMatchingPassword(passwordAttempt, user.hash);
  }

  static async findById(_id) {
    return User.findOne({ _id });
  }

  static async findByEmail(email) {
    return User.findOne({ email });
  }

  static async doesUserExist(email) {
    return User.findByEmail(email) !== null;
  }

  static collectionName() {
    return collection;
  }

  async ownerOf() {
    return Organisation.find({ owner: this._id }, {});
  }

  async memberOf() {
    return Organisation.find({ members: { $in: [this._id] } }, {});
  }
}

export default User;
