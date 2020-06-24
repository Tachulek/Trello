'use strict'

const mongoose = require('mongoose');
const Task = require('../models/Task')

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
            return 'hello ' + payload;
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
            var task = new Task()
            task.task_name = req.payload.task_name;

            return task.save().then((err, res) => {
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
         method: 'PUT',
         path: '/task/{id}',
         handler: (req, h) => 
         {
            return Task.findOneAndUpdate(
               {
                  _id: mongoose.Types.ObjectId(req.params.id)
               },
               {
                  task_name: req.payload.task_name   
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
      })

      server.route(
      {
         method: 'DELETE',
         path: '/tasks/{id}',
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

      server.route({
         method: 'GET',
         path:'/hello/{name}', 
         handler: (request, reply) =>
         {
            // Passed parameter is accessible via "request.params" 
            return `Hello ${request.params.name}`;
         }
      })

   },
   name: 'api'
}