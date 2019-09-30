import Database from '../../src/common/db';

import { dropDb } from '../helpers/dbHelper';
import { postResource } from '../helpers/apiRequestHelper';
import { seedUser } from '../factories/user';

const chai = require('chai');
const chaiHttp = require('chai-http');

let app;
const email = 'user@email.com';
const password = 'super secret password';
const headers = {
  email,
  password
};

const endpoint = '/auth';

xdescribe(`${endpoint} endpoint`, () => {
  beforeEach(async () => {
    await dropDb();
    // eslint-disable-next-line global-require
    app = require('../../src/app');
    chai.use(chaiHttp);

    await seedUser({ email }, password);
  });

  afterEach(async () => dropDb());

  xdescribe('POST', () => {
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
          console.log('here?');
          console.log(response);
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
