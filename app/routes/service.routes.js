const { verifyEndp } = require("../middlewares");
const service = require("../controllers/service.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/test/HealthStatusCheck/:endpointName", service.HealthStatusCheck);
  app.post("/api/test/createservice",service.create);
  app.get("/api/test/allservices", service.findAll);
  app.put("/api/test/update/:id", service.update);
};