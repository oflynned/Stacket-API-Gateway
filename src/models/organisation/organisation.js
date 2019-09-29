import { Document } from 'camo';

import schema from './schema';

const collection = 'organisations';

class Organisation extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static collectionName() {
    return collection;
  }

  static async findById(_id) {
    return Organisation.findOne({ _id });
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

export default Organisation;
