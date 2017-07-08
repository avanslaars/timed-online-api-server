'use strict'
const Hapi = require('hapi')
const {saveCommand, loadCommand} = require('./services')

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
}, {
  method: 'GET',
  path: '/command/{cmd}',
  handler: function (request, reply) {
    const cmd = request.params.cmd
    loadCommand(cmd)
      .then(console.log)
      .then(() => reply())
  }
}])

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
