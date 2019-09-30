const schema = {
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  },
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  hash: {
    required: true,
    type: String
  }
};

export default schema;
