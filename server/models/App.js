/**
 * Created by skz on 2016/12/27 0027.
 */

let mongoose 		= require("mongoose");
let Schema 			= mongoose.Schema;

let AppSchema = new Schema({
  name: {
    type: String,
    trim: true,
    "default": ""
  },
  path: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    "default": 'node'
  },
  icon: {
    type: String,
    "default": "",
    trim: true
  },
  desc: {
    type: String,
    "default": ""
  },
  url: {
    type: String,
    "default": ""
  },
  use: {
    type: Number,
    "default": 1
  },
  color: {
    type: String,
    "default": "green"
  }
});

let App = mongoose.model("app", AppSchema);

module.exports = App;
