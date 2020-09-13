
'use strict'

const mongoose = require('mongoose');
const Table = require('../models/Table')

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
      })

      server.route(
      {
         method: 'POST',
         path: `/{id}/table`,
         handler: (req, h) => 
         {
            console.log("1")
            var table = new Table()
            console.log("2 "+ req.payload.tableTitle)
            table.tableName = String(req.payload.tableTitle);
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
      })

      // server.route(
      // {
      //    method: 'GET',
      //    path: '/tasks',
      //    handler: (req, h) => 
      //    {
      //       return Task.find((err, res) => 
      //       {
      //          if(err)
      //          {
      //             return err;
      //          }
      //          return res;
      //       })
      //    }
      // })

      // server.route(
      // {
      //    method: 'GET',
      //    path: '/tasks/{id}',
         
      //    handler: (req, h) => 
      //    {
      //       return Task.findOne(
      //       {
      //          _id: mongoose.Types.ObjectId(req.params.id)
      //       },
      //       (err, doc) => 
      //       {
      //          if(err)
      //          {
      //             return err, 'Internal MongoDB error';
      //          }
      //          if(!doc)
      //          {
      //             return 'Not Found'
      //          }
      //          return doc;
      //       })
      //    }
      // })

      // server.route(
      // {
      //    method: 'POST',
      //    path: '/task',
      //    handler: (req, h) => 
      //    {
      //       var task = new Task()
      //       task.task_name = req.payload.task_name;

      //       return task.save().then((err, res) => {
      //          if(err)
      //          {
      //             return err;
      //          }
      //          return res;
      //       })
      //    }
      // })

      // server.route(
      // {
      //    method: 'PUT',
      //    path: '/task/{id}',
      //    handler: (req, h) => 
      //    {
      //       return Task.findOneAndUpdate(
      //          {
      //             _id: mongoose.Types.ObjectId(req.params.id)
      //          },
      //          {
      //             task_name: req.payload.task_name   
      //          },
      //          (err, result) => 
      //          {
      //             if(err)
      //             {
      //                return err, 'Internal MongoDB error';
      //             }
      //             if(result.n === 0)
      //             {
      //                return 'Not found';
      //             }
      //             return 204;
      //          })
      //    }
      // })

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
                  if(result.n === 0)
                  {
                     return 'Not founddddd';
                  }
                  return 204;
               })
         }
      })

      // server.route({
      //    method: 'GET',
      //    path:'/hello/{name}', 
      //    handler: (request, reply) =>
      //    {
      //       // Passed parameter is accessible via "request.params" 
      //       return `Hello ${request.params.name}`;
      //    }
      // })

   },
   name: 'tables'
}