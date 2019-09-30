const schema = {
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  },
  name: String,
  email: String,
  hash: String
};

export default schema;
