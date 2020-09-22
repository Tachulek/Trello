'use strict'

const mongoose = require('mongoose');
const Task = require('../models/Task')
var bodyParser = require('body-parser')


exports.plugin = {
   register: (server, options) => 
   {

      server.route(
      {
         method: 'GET',
         path: '/xyz',
         handler: (request, h) =>
         {
            const payload = request.payload;
            return 'hello world';
         }
      })

      server.route(
      {
         method: 'GET',
         path: '/tasks',
         handler: (req, h) => 
         {
            return Task.find((err, res) => 
            {
               if(err)
               {
                  return err;
               }
               return res;
            })
         }
      })

      server.route(
      {
         method: 'GET',
         path: '/tasks/{id}',
         
         handler: (req, h) => 
         {
            return Task.findOne(
            {
               _id: mongoose.Types.ObjectId(req.params.id)
            },
            (err, doc) => 
            {
               if(err)
               {
                  return err, 'Internal MongoDB error';
               }
               if(!doc)
               {
                  return 'Not Found'
               }
               return doc;
            })
         }
      })

      server.route(
      {
         method: 'POST',
         path: '/task',
         handler: (req, h) => 
         {
            var payload = req.payload
            console.log("req : " + payload)
            console.log("req2: " + req.body)
            var task = new Task()
            console.log("/task task1: " + task)
            task.taskName = String(payload.taskName);
            task.listId = payload.listId;
            task.tableId = payload.tableId;
            console.log("/task task: " + task)

            return task.save().then((err, res) => {
               if(err)
               {
                  return err;
               }
               return res;
            })
         }
      }),

      server.route(
      {
         method: 'PUT',
         path: '/task/{id}',
         handler: (req, h) => 
         {
            console.log("PUT "+req.payload)
            console.log("COMMENTS: "+ req.payload.comments)
            return Task.findOneAndUpdate(
               {
                  _id: mongoose.Types.ObjectId(req.params.id)
               },
               {
                  taskName: req.payload.taskName,
                  tableId: req.payload.tableId,
                  listId: req.payload.listId,
                  comments: req.payload.comments,
                  orders: req.payload.orders
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
         method: 'GET',
         path: `/list/{id}`,
         handler: (request, h) =>
         {
            console.log("listGET: " + request.params.id)
            return Task.find({listId: request.params.id},(err, res) => 
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
         method: 'DELETE',
         path: '/task/{id}',
         options:
         {
            cors: true
         },
         handler: (req, h) => 
         {
            return Task.findOneAndDelete(
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


   },
   name: 'tasks'
}