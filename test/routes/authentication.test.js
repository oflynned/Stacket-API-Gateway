import { dropDb } from '../helpers/dbHelper';
import { postResource } from '../helpers/apiRequestHelper';
import { seedUser } from '../factories/user';

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

    await seedUser({ email }, password);
  });

  afterEach(async () => dropDb());

  describe('POST', () => {
    describe('should return 200', () => {
      test('when user account already exists', async (done) => {
        try {
          const { body, status } = await postResource(app, headers, endpoint, {});
          expect(body.email)
            .toEqual(email);
          expect(status)
            .toEqual(200);
          done();
        } catch ({ response }) {
          done(response);
        }
      });
    });

    xdescribe('should return 201', () => {

    });

    xdescribe('should return 400', () => {

    });
  });

  xdescribe('GET', () => {
    xdescribe('should return 201', () => {

    });

    xdescribe('should return 401', () => {

    });
  });

  xdescribe('DELETE', () => {
    xdescribe('should return 204', () => {

    });

    xdescribe('should return 403', () => {

    });
  });
});
