import { dropDb } from '../helpers/dbHelper';
import { deleteSessionResource, getResource, postResource } from '../helpers/apiRequestHelper';
import { generateUser, seedUser } from '../factories/user';

import Database from '../../src/common/db';
import server from '../../src/server';

let app;

const chai = require('chai');
const chaiHttp = require('chai-http');

const email = 'user@email.com';
const password = 'super secret password';
const headers = {
  email,
  password
};

const endpoint = '/auth';

describe(`${endpoint} endpoint`, () => {
  beforeAll(async () => Database.connect());

  beforeEach(async () => {
    await dropDb();
    app = server.getApp();
    chai.use(chaiHttp);
  });

  afterEach(async () => dropDb());

  describe('POST', () => {
    describe('should return 200', () => {
      test('when user account already exists', async (done) => {
        await seedUser({ email }, password);
        const { body, status } = await postResource(app, headers, endpoint, {});
        expect(body.email)
          .toEqual(email);
        expect(status)
          .toEqual(200);
        done();
      });
    });

    describe('should return 201', () => {
      test('when user account already exists', async (done) => {
        const { body, status } = await postResource(app, headers, endpoint, generateUser());
        expect(body.email)
          .toEqual(email);
        expect(status)
          .toEqual(201);
        done();
      });
    });

    describe('should return 400', () => {
      test('when new user account is malformed', async (done) => {
        const { status, body } = await postResource(app, headers, endpoint, {});
        expect(status)
          .toEqual(400);
        expect(body.error)
          .toMatch(/name is required/);
        done();
      });
    });
  });

  describe('GET', () => {
    beforeEach(async () => dropDb());
    afterEach(async () => dropDb());

    describe('should return 201', () => {
      test('when requesting a new session uuid', async (done) => {
        await seedUser({ email }, password);
        const { status, body } = await getResource(app, headers, endpoint);
        expect(status)
          .toEqual(201);
        expect(body)
          .toHaveProperty('sessionId');
        expect(body.sessionId)
          .not
          .toBeNull();
        done();
      });
    });

    describe('should return 401', () => {
      test('when account does not exist', async (done) => {
        const { status } = await getResource(app, headers, endpoint);
        expect(status)
          .toEqual(401);
        done();
      });
    });
  });

  xdescribe('DELETE', () => {
    beforeEach(async () => dropDb());

    afterEach(async () => dropDb());

    describe('should return 204', () => {
      test('when account does not exist', async (done) => {
        await seedUser({ email }, password);
        // TODO seed session job
        const { body: { sessionId } } = await getResource(app, headers, endpoint);
        const { status } = await deleteSessionResource(app, sessionId, endpoint);
        expect(status)
          .toEqual(204);
        done();
      });
    });

    describe('should return 403', () => {
      test('when requesting to end another users session', async (done) => {
        const { body: { sessionId } } = await getResource(app, headers, endpoint);
        const { status } = await deleteSessionResource(app, sessionId, endpoint);
        expect(status)
          .toEqual(403);
        done();
      });
    });
  });
});
