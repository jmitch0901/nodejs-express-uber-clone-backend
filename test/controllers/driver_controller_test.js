const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {

  it('POST to /api/drivers creates a new driver', done => {

    Driver.count().then(count => {

      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers/:id_driver edits an existing driver', done => {
    const driver = new Driver({ email: 't@t.com', driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 't@t.com' })
          .then(newDriver => {
            assert(newDriver.driving === true);
            done();
          });
        });
    });

  });

  it('DELETE to /api/drivers/:id_driver removes an existing driver', done => {
    const driver = new Driver({ email: 't2@t2.com', driving: false });
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 't2@t2.com' })
            .then(newDriver => {
              assert(newDriver === null);
              done();
            });
        });
    });
  });

  it('GET to /api/drivers find driver in a location', done => {
    const seattleDriver = new Driver({
      email: 'seattleDriver@test.com' ,
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app).get('/api/drivers?lng=-80&lat=25').end((err, response) => {
          const { body } = response;
          assert(body.length === 1);
          assert(body[0].obj.email === 'miami@test.com');
          done();
        });
      });
  });



});
