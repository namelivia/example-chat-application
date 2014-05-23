var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new Schema({
  username:    { type: String },
  password:   { type: String }
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
