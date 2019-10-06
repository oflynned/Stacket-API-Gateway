const chai = require('chai');

function generateAuthorization({ email, password }) {
  const base64 = Buffer.from(`${email}:${password}`)
    .toString('base64');
  return `Basic ${base64}`;
}

export function postResource(app, headers, endpoint, data = {}) {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .post(endpoint)
      .set('Authorization', generateAuthorization(headers))
      .set('Content-Type', 'application/json')
      .send(data)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export function patchResource(app, headers, endpoint, data) {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .patch(endpoint)
      .set('Authorization', generateAuthorization(headers))
      .set('Content-Type', 'application/json')
      .send(data)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export function getResource(app, headers, endpoint) {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .get(endpoint)
      .set('Authorization', generateAuthorization(headers))
      .set('Content-Type', 'application/json')
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export function deleteResource(app, headers, endpoint) {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .delete(endpoint)
      .set('Authorization', generateAuthorization(headers))
      .set('Content-Type', 'application/json')
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export function deleteSessionResource(app, sessionId, endpoint) {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .delete(endpoint)
      .set('x-session-id', sessionId)
      .set('Content-Type', 'application/json')
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}
