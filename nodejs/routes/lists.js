'use strict'

const mongoose = require('mongoose');
const List = require('../models/List')
const Task = require('../models/Task')


exports.plugin = {
   register: (server, options) => 
   {

      server.route(
      {
         method: 'GET',
         path: '/lists',
         handler: (req, h) => 
         {
            return List.find((err, res) => 
            {
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
         method: 'GET',
         path: '/lists/{id}',
         
         handler: (req, h) => 
         {
            return List.findOne(
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
      }),

      server.route(
      {
         method: 'POST',
         path: '/list',
         handler: (req, h) => 
         {
            var payload = req.payload
            var list = new List()
            list.listName = payload.listName;
            list.tableId = payload.tableId;
            console.log("/list list: " + list)

            return list.save().then((err, res) => {
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
         path: '/list/{id}',
         handler: (req, h) => 
         {
            return List.findOneAndUpdate(
               {
                  _id: mongoose.Types.ObjectId(req.params.id)
               },
               {
                  listName: req.payload.listName   
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
         path: `/table/{id}`,
         handler: (request, h) =>
         {
            console.log("tableGET: " + request.params.id)
            return List.find({tableId: request.params.id},(err, res) => 
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
         path: '/list/{id}',
         options:
         {
            cors: true
         },
         handler: (req, h) => 
         {

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
            
            return List.findOneAndDelete(
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
                     return 'Not found';
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
   name: 'lists'
}