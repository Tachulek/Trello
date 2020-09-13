const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema(
   {
      userId: {
         type: String
      },
      tableName: {
         type: String
      }
   }
)

module.exports = mongoose.model('Tables', TableSchema)

