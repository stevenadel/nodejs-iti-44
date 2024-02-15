const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20
    },
    status: {
      type: String,
      enum: ['to-do', 'in progress', 'done'],
      default: 'to-do'
    },
    tags: {
      type: [String],
      maxlength: 10
    }
  },
  {
    timestamps: true
  }
);

const TodosModel = mongoose.model('Todos', todosSchema);
module.exports = TodosModel;