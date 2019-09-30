import { dropDb } from '../helpers/dbHelper';

const chai = require('chai');
const chaiHttp = require('chai-http');

let app;
const email = 'user@email.com';
const password = 'super secret password';
const headers = {
  email,
  password
};
const url = '/auth';

describe(`${url} endpoint`, () => {
  beforeEach(async () => {
    await dropDb();
    // eslint-disable-next-line global-require
    app = require('../../src/app');
    chai.use(chaiHttp);
  });

  afterEach(async () => dropDb());

  describe('POST', () => {
    describe('should return 200', () => {
      test('when creating new user account', async (done) => {
        done();
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
