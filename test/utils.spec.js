'use strict'

const expect = require('chai').expect
const {getStandardDeviationOfRuns} = require('../utils')

describe('Utils', () => {
  describe('getStandardDeviationOfRuns', () => {
    it('should calculate the expected standard deviation', () => {
      const input = {
        '-KoXhmJws-_xlUKlbDQA': { time: 2423.222316 },
        '-KoXlUM8D9rBIDvftnRJ': { time: 2233.516735 },
        '-KoXla2QUhFDCrumYwWf': { time: 2257.807591 }
      }
      const expected = 84.288053980638 // Using population std deviation from: http://www.calculator.net/standard-deviation-calculator.html?numberinputs=2423.222316%2C+2233.516735%2C+2257.807591&x=49&y=10
      const result = getStandardDeviationOfRuns(input)
      expect(result).to.equal(expected)
    })
  })
})
