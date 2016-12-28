const driversController = require('../controllers/drivers_controller');

module.exports = app => {
  app.get('/api/drivers', driversController.index);
  app.post('/api/drivers', driversController.create);
  app.put('/api/drivers/:id_driver', driversController.edit);
  app.delete('/api/drivers/:id_driver', driversController.delete);
};
