const endpoint = require("../controllers/endpoints.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/test/new_endpoint", endpoint.createEndpoint);
  app.get("/api/test/allendpoints", endpoint.allEndpoints);
  app.get('/api/endpoints/:endpointName', endpoint.findByName);
  app.get('/api/endpoints/service/:serviceId', endpoint.findByServiceId);
  app.delete('/endpoints/delete/:id', endpoint.delete);


};