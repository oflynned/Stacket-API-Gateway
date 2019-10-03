import { Document } from 'camo';

import schema from './schema';
import User from '../user/user';

class Organisation extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async findById(_id) {
    return Organisation.findOne({ _id });
  }

  async ownedBy() {
    // FIXME
    //  hacky fix as top level queries have a user object
    //  lower classes have the id as a string
    const _id = (this.owner.constructor === User) ? this.owner._id : this.owner;
    return User.findOne({ _id }, {});
  }
}

export default Organisation;
