const { json } = require("express");
const { service } = require("../models");
const db = require("../models");
const Service = db.service;
const Endpoint=db.endpoint

exports.HealthStatusCheck = (req,res) => {var axios = require('axios');
//mel lbase
// req.body.name
//req.bode.endpointname 
// to change   "date": "2022-08-11","time": "15:58",

var edp=req.params.endpointName;
var data = JSON.stringify(
  {
  "departureLocation": {
    "code_dep": "CDG",
    "id": "ChIJW89MjgM-5kcRLKZbL5jgKwQ",
    "latitude": 49.006875,
    "longitude": 2.5710604,
    "name": "Paris - CDG",
    "address": "Avenue Charles de Gaulle, 95700 Roissy-en-France"
  },
  "arrivingLocation": {
    "code_arr": "",
    "id": "ChIJveJ6yhkd5kcRYOYQY8v4-lc",
    "latitude": 48.8673858,
    "longitude": 2.783593,
    "name": "Disneyland Paris",
    "address": "Bd de Parc, 77700 Coupvray, France",
    "addressLine1": "France",
    "addressLine2": "France"
  },
  "date": "2022-08-11",
  "time": "15:58",
  "passengers": {
    "adults": "1",
    "babies": "0",
    "children": "0",
    "total": "1"
  },
  "immediate": false,
  "goingsComings": false,
  "tripType": {
    "hour": 0,
    "tripType": "DEFAULT"
  },
  "tripOptions": {}
}
);
var config = {
  method: 'post',
  //url to change
  url: 'https://api.preprod.airportmobility.rem4u.com/'+edp,
  headers: {
    'Accept': 'application/json, text/plain, */*', 
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8', 
    'Connection': 'keep-alive', 
    'Content-Type': 'application/json', 
    'Origin': 'https://www.preprod.airportmobility.rem4u.com', 
    'Referer': 'https://www.preprod.airportmobility.rem4u.com/', 
    'Sec-Fetch-Dest': 'empty', 
    'Sec-Fetch-Mode': 'cors', 
    'Sec-Fetch-Site': 'same-site', 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 OPR/89.0.4447.83', 
    'sec-ch-ua': '"Opera";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"Windows"'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(response.status)
 return res.status(response.status).send (
  {
    "status" : response.status,
    "service" : "name",
    "message":"done"
  }
 )
})
.catch(function (error) {
  if ( error.status ==400
    ) {
      return res.status(error.status).send (
        {
          "status" : error.status,
          "service" : "name",
          "message":"error "+error.status    }
       )
  } else  {
    return res.status(500).send (
      {
        "status" : 500,
        "service" : "name",
        "message":"error "+ "500"    
      }
     )
  }
    
 });
}



//Create and Save a new Service
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Service
  const service = new Service({
    name: req.body.name,
    enable:true
  });
  // Save Service in the database
          service.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "service was registered successfully!" });
          });
};
// Retrieve all Services from the database.
exports.findAll = (req, res) => {
  Service.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services."
      });
    });
  
};

// Update a Service by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Service.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Service with id=${id}. Maybe Service was not found!`
        });
      } else res.send({ message: "Service was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Service with id=" + id
      });
    });
  
};
// Delete a Service with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Service.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
        });
      } else {
        res.send({
          message: "Service was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Service with id=" + id
      });
    });
  
};
// Delete all Services from the database.
exports.deleteAll = (req, res) => {
  Service.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Services were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all services."
    });
  });
  
};



