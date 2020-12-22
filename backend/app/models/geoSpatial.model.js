var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const GeoSpatial = mongoose.model(
    "GeoSpatial",
    (new mongoose.Schema({
      username: String,
      location: {
      type: { type: String },
            coordinates: []
      },
      downloads:Array
    })).index({ location: "2dsphere" })
  );
module.exports = GeoSpatial;