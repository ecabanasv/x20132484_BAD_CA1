var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String, trim: true, unique: true, required: true },
  hashed_password: { type: String, required: true },
  address: { type: String, required: true },
});

usersSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hashed_password);
};

const users = mongoose.model("users", usersSchema);

module.exports = users;
