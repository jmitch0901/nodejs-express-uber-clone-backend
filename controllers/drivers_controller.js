const Driver = require('../models/driver');

module.exports = {

  index(req,res,next) {

    const { lng, lat } = req.query;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng),parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    ).then(drivers => {
      res.send(drivers);
    })
    .catch(next);
  },

  create(req,res,next) {
    const driverProps = req.body;
    Driver.create(driverProps)
    .then(driver => res.json(driver))
    .catch(next);
  },

  edit(req,res,next) {

    const driverId = req.params.id_driver;
    const driverProps = req.body;

    Driver.findByIdAndUpdate(driverId,driverProps)
      .then(() => Driver.findById(driverId))
      .then(driver => res.json(driver))
      .catch(next);
  },

  delete(req,res,next) {
    const driverId = req.params.id_driver;
    Driver.findByIdAndRemove(driverId)
      .then(driver => res.status(204).json(driver))
      .catch(next);
  }
};
