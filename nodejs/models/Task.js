const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
   {
      tableId: {
      type: String
       },
      taskName: {
         type: String, default: 'hehe'
      }
   }
)

module.exports = mongoose.model('Tasks', TaskSchema)

