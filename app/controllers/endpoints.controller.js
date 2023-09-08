const db = require("../models");
const Endpoint=db.endpoint



//Create and Save a new Endpoint
exports.createEndpoint = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  if (!req.body.url) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Endpoint
  const endpoint = new Endpoint({
    name: req.body.name,
    url: req.body.url,
    service: req.body.service
  });
  // Save Endpoint in the database
  endpoint.save(err => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "endpoint was registered successfully!" });
  });
};
// Retrieve all Endpoints from the database.
exports.allEndpoints = (req, res) => {
  Endpoint.find().populate('service')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Endpoints."
      });
    });
  
};

exports.findByName = (req, res) => {
  Endpoint.findOne({ name: req.params.endpointName })
  .populate('service')
  .exec(function (err, endpoint) {
      if (err){
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "endpoints not found with given name " + req.params.endpointName
              });                
          }
          return res.status(500).send({
              message: "Error retrieving endpoints with given service Id " + req.params.endpointName
          });
      }
                  
      res.send(endpoint);
  });
};

exports.findByServiceId = (req, res) => {
  Endpoint.find({ service : req.params.serviceId })
  .exec(function (err, endpoints) {
      if (err){
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "endpoints not found with given service Id " + req.params.serviceId
              });                
          }
          return res.status(500).send({
              message: "Error retrieving endpoints with given service Id " + req.params.serviceId
          });
      }
                  
      res.send(endpoints);
  });
};


exports.delete =  (req, res) => {
  const id = req.params.id;
  Endpoint.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Endpoint with id=${req.params.id}. Maybe Endpoint was not found!`
        });
      } else {
        res.send({
          message: "Endpoint was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Endpoint with id=" + req.params.id
      });
    });
  
};