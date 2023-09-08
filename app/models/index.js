const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.ROLES = ["user", "admin", "moderator"];
db.service=require("./service.model");
db.endpoint=require("./endpoint.model");
db.ENDPOINTS=["carpooling", "intermodal", "vtc_taxi","shuttle_bus"];
module.exports = db;