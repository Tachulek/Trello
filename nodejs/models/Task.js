const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
   {
      task_name: {
         type: String, default: 'hehe'
      }
   }
)

module.exports = mongoose.model('Tasks', TaskSchema)

