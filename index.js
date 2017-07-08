'use strict'
const Hapi = require('hapi')
const {saveCommand} = require('./services')

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 8000
})

server.route([{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply('hello world')
  }
}, {
  method: 'POST',
  path: '/command',
  handler: function (request, reply) {
    const {name, time} = request.payload
    saveCommand(name, time)
      .then(res => reply())
  }
}])

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
