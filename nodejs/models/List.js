const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema(
   {
      tableId: {
      type: String, default: 'null'
       },
      listName: {
         type: String, default: 'list'
      }
   }
)

module.exports = mongoose.model('Lists', ListSchema)

