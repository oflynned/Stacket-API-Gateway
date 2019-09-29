import { Document } from 'camo';

import schema from './schema';
import Organisation from '../organisation/organisation';

const collection = 'users';

class User extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async findById(_id) {
    return User.findOne({ _id });
  }

  static async findByEmail(email) {
    return User.findOne({ email });
  }

  static collectionName() {
    return collection;
  }

  async ownerOf() {
    return Organisation.find({ owner: this._id });
  }

  async memberOf() {
    return Organisation.find({ members: { $in: [this._id] } });
  }

  preValidate() {
    super.preValidate();
  }

  preSave() {
    super.preSave();
  }

  preDelete() {
    super.preDelete();
  }
}

export default User;
