/**
 * Created by skz on 2016/12/27 0027.
 */
let mongoose 		= require("mongoose");
let Schema 			= mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    "default": ""
  },
  password: {
    type: String,
    "default": ""
  }
});

/**
 * Password compare
 */
UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

let User = mongoose.model("user", UserSchema);

module.exports = User;
