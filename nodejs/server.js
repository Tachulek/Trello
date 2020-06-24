'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose')

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: 
    {
        cors: true
    }
});

server.app.db = mongoose.connect(
    'mongodb://localhost/trello_db',
    {
        useNewUrlParser: true
    }
);

const init = async() => {
    await server.register(
    {
        plugin: require('./routes/tasks'),
    },
    {
        routes:
        {
            prefix: '/api'
        }
    })
    .catch(err=> {
        console.log(err)
    })

    await server.start()
    console.log('Server runing at:' + server.info.uri);
}

init();
