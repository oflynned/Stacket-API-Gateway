import User from '../user/user';

export const TTL_EIGHT_HOURS = 30 * 24 * 60 * 60 * 1000;

const schema = {
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  },
  sessionId: String,
  user: User,
  expiryTime: {
    type: Date,
    default: Date.now() + TTL_EIGHT_HOURS
  }
};

export default schema;
