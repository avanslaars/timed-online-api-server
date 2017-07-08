'use strict'

const {compose, values, pluck, mean, map, invoker, converge, identity} = require('ramda')

const getRunTimes = compose(pluck('time'), values)

const getAverageOfRuns = compose(mean, getRunTimes)

const getSquaredDiffs = (avg, times) => map(t => (t - avg) ** 2, times)

const toPrecision = invoker(1, 'toPrecision')

const fixPrecision = compose(Number, toPrecision(14))

const getStanderdDevation = compose(
  fixPrecision,
  Math.sqrt,
  mean,
  converge(getSquaredDiffs, [mean, identity])
)

// Calc std deviation based on: https://www.mathsisfun.com/data/standard-deviation-formulas.html
const getStandardDeviationOfRuns = compose(getStanderdDevation, getRunTimes)

module.exports = {
  getStandardDeviationOfRuns,
  getAverageOfRuns
}
