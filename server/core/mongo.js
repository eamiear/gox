/**
 * Created by skz on 2016/12/27 0027.
 */
let mongoose 		= require("mongoose");
let config 			= require("../config");

module.exports = function() {
  let db;
  mongoose.Promise = global.Promise;

  if (mongoose.connection.readyState !== 1) {
    db = mongoose.connect(config.db.uri, config.db.options, function mongoAfterConnect(err) {

      if (err) {
        console.error("Could not connect to MongoDB!");
        return console.error(err);
      }else {
        console.info("MongoDB connected.");
      }
    });

    mongoose.connection.on("error", function mongoConnectionError(err) {
      if (err.message.code === "ETIMEDOUT") {
        console.warn("Mongo connection timeout!", err);
        setTimeout(() => {
          mongoose.connect(config.db.uri, config.db.options);
        }, 1000);
        return;
      }

      console.error("Could not connect to MongoDB!");
      return console.error(err);
    });

  } else {
    console.info("Mongo already connected.");
    db = mongoose;
  }

  return db;
};
