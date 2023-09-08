const Service = require('../models/service.model');
const mongoose = require("mongoose"),Schema = mongoose.Schema;


const EndpointSchema = mongoose.Schema({
  name: String,
  url: String,
  service : { type: Schema.Types.ObjectId, ref: 'Service' }
});
module.exports = mongoose.model('Endpoint',EndpointSchema);