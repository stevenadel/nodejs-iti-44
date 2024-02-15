const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 8
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15
    },
    dob: {
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.password = undefined;
        return ret;
      },
    },
  }
);

usersSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const UsersModel = mongoose.model('Users', usersSchema);

module.exports = UsersModel;