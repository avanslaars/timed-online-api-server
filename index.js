'use strict'
const Hapi = require('hapi')
const vision = require('vision')
const handlebars = require('handlebars')
const routes = require('./routes')

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 8000
})

const plugins = [
  {register: vision},
  {register: routes}
]

server.register(plugins)
  .then(err => {
    if (err) { throw err }

    server.views({
      engines: { html: handlebars },
      relativeTo: __dirname,
      path: 'templates'
    })

    server.start((err) => {
      if (err) { throw err }
      console.log('Server running at:', server.info.uri)
    })
  })
