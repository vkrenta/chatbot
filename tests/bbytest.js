/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha')
const { expect } = require('chai')
const bby = require('../modules/bbyapi')

describe('Testing BestBuy API: ', () => {
  it('Get list of all categories: ', () => {
    bby.getListOfCategories()
      .then((data) => {
        console.log(data)
        expect(data !== null || data.length).to.be.true
      })
      .catch((err) => {
        console.warn(err)
        expect(false).to.be.true
      })
  })
})
