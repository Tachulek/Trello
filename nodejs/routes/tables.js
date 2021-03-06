
'use strict'

const mongoose = require('mongoose');
const Table = require('../models/Table')
const List = require('../models/List')
const Task = require('../models/Task')

exports.plugin = {
   register: (server, options) => 
   {

      server.route(
      {
         method: 'GET',
         path: `/{id}/tables`,
         handler: (request, h) =>
         {
            console.log("GET: " + request.params.id)
            return Table.find({userId: request.params.id},(err, res) => 
            {
               if(err)
               {
                  console.log("notablesfoundGET")
                  console.log(err)
                  return err;
               }
               return res;
            })
         }
      }),

      server.route(
      {
         method: 'POST',
         path: `/{id}/table`,
         handler: (req, h) => 
         {
            var table = new Table()
            console.log("2 "+ req.payload.tableTitle)
            table.tableName = req.payload.tableName;
            console.log("3 "+table.tableName)
            table.userId = req.params.id
            console.log("4 "+ table.userId)

            return table.save().then((err, res) => {
               if(err)
               {
                  console.log("tableERRORPOST")
                  console.log(err)
                  return err;
               }
               console.log("tablenoerrPOST")
               return res;
            })
         }
      }),


      server.route(
      {
         method: 'PUT',
         path: '/table/{id}',
         handler: (req, h) => 
         {
            return Table.findOneAndUpdate(
               {
                  _id: mongoose.Types.ObjectId(req.params.id)
               },
               {
                  tableName: req.payload.tableName   
               },
               (err, result) => 
               {
                  if(err)
                  {
                     return err, 'Internal MongoDB error';
                  }
                  if(result.n === 0)
                  {
                     return 'Not found';
                  }
                  return 204;
               })
         }
      }),

      server.route(
      {
         method: 'DELETE',
         path: '/table/{id}',
         options:
         {
            cors: true
         },
         handler: (req, h) => 
         {
            console.log("yyy " + req.params.id)


            Task.deleteMany({tableId: req.params.id},(err, res) => 
            {
               if(err)
               {
                  console.log('Issue with deleting task from table');
               }
               if(res && res.n === 0)
               {
                  console.log('no task found');
               }
            })
            
            List.deleteMany({tableId: req.params.id},(err, res) => 
            {
               if(err)
               {
                  console.log('Issue with deleting task from table');
               }
               if(res && res.n === 0)
               {
                  console.log('no task found');
               }
            })
            
            return Table.findOneAndDelete(
               {
                  _id: mongoose.Types.ObjectId(req.params.id)
               },
               (err, result) => 
               {
                  if(err)
                  {
                     return err, 'Internal MongoDB error';
                  }
                  if(result && result.n === 0)
                  {
                     return 'Not founddddd';
                  }
                  else if(!result)
                  {
                     return 404;
                  }
                  return 204;
               })
         }
      })

   },
   name: 'tables'
}