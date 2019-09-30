import { Document } from 'camo';

import schema from './schema';

class Organisation extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async findById(_id) {
    return Organisation.findOne({ _id });
  }
}

export default Organisation;
