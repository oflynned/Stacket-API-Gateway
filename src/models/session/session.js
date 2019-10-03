import { Document } from 'camo';

import schema, { TTL_EIGHT_HOURS } from './schema';
import User from '../user/user';
import { generateHmacFromToken } from '../../common/hashing';

class Session extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async findBySessionId(sessionId) {
    const sessionHmac = await generateHmacFromToken(sessionId);
    return Session.findOne({ sessionId: sessionHmac });
  }

  static async findActiveBySessionId(sessionId) {
    const sessionHmac = await generateHmacFromToken(sessionId);
    return Session.findOne({
      sessionId: sessionHmac,
      expiryTime: { $gt: Date.now() }
    });
  }

  static async findByUserId(userId) {
    return Session.find({ user: userId });
  }

  static async findActiveSessions(userId) {
    return Session.find({
      user: userId,
      expiryTime: { $gt: Date.now() }
    });
  }

  static async extendExpiry(sessionId) {
    const sessionHmac = await generateHmacFromToken(sessionId);
    return Session.findOneAndUpdate(
      { sessionId: sessionHmac },
      { expiryTime: Date.now() + TTL_EIGHT_HOURS }
    );
  }

  static async purgeExpiredSessions() {
    return Session.deleteMany({ expiryTime: { $lt: Date.now() } });
  }

  static async purgeSession(sessionId) {
    const sessionHmac = await generateHmacFromToken(sessionId);
    return Session.deleteOne({ sessionId: sessionHmac });
  }

  async user() {
    return User.findById(this.userId);
  }

  isExpired() {
    return this.expiryTime < Date.now();
  }
}

export default Session;
