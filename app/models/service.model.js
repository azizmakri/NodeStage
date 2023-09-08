const mongoose = require("mongoose"),Schema = mongoose.Schema;
const Endpoint = require('../models/endpoint.model');


const ServiceSchema = mongoose.Schema({
  name: String,
  enable: Boolean
});

module.exports = mongoose.model('Service',ServiceSchema);