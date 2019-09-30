import User from '../user/user';

const ONE_HOUR = 60 * 60 * 1000;
export const TTL_EIGHT_HOURS = 8 * ONE_HOUR;

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
