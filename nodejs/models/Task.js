const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
   {
      tableId: {
         type: String, default: 'null'
      },
      listId: {
      type: String, default: 'null'
      },
      taskName: {
         type: String, default: 'hehe'
      },
      comments: [{
         type: String
      }],
      orders: [{
         type: String
      }]
   }
)

module.exports = mongoose.model('Tasks', TaskSchema)

