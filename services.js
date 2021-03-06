'use strict'

const axios = require('axios')

const firebaseRoot = 'https://timed-scripts.firebaseio.com'

const saveCommand = (cmd, time) => {
  return axios.post(`${firebaseRoot}/commands/${encodeURIComponent(cmd)}/runs.json`, { time })
    .then(({data}) => data)
}

const loadCommand = (cmd) => {
  return axios.get(`${firebaseRoot}/commands/${encodeURIComponent(cmd)}/runs.json`)
    .then(({data}) => data)
}

module.exports = {
  saveCommand,
  loadCommand
}
