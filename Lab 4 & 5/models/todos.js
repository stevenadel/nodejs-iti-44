const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
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
    validate: {
      validator: function(tags) {
        return tags.every(tag => tag.length <= 10);
      },
      message: props => `${props.value} exceeds max length of 10 characters.`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const TodosModel = mongoose.model('Todos', todosSchema);

module.exports = TodosModel;