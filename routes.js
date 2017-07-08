'use strict'
const {saveCommand, loadCommand} = require('./services')
const {getStandardDeviationOfRuns, getAverageOfRuns} = require('./utils')

exports.register = function (server, options, next) {
  server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return reply.view('home')
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
      .then(runs => ({
        avg: getAverageOfRuns(runs),
        dev: getStandardDeviationOfRuns(runs)
      }))
      .then(reply)
    }
  }])
  next()
}

exports.register.attributes = {
  name: 'timed-online API routes'
}
