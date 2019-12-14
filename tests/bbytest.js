/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha')
const { expect } = require('chai')
const bby = require('../modules/bbyapi')

describe('Testing BestBuy API: ', () => {
  it('Get list of all categories: ', async () => {
    await bby.getListOfCategories()
      .then((data) => {
        console.log(data)
        expect(data !== null).to.be.true
      })
      .catch((err) => {
        console.warn(err)
        expect(false).to.be.true
      })
  })

  it('Get products by category id: ', async () => {
    await bby.getProductsByCategory('abcat0102000')
      .then(data => {
        console.log(data)
        expect(data !== null).to.be.true
      })
      .catch(err => {
        console.warn(err)
        expect(false).to.be.true
      })
  })

  it('Get product by sku: ', async () => {
    await bby.getProductBySku(4743301)
      .then(data => {
        console.log(data)
        expect(data !== null).to.be.true
      })
      .catch(err => {
        console.warn(err)
        expect(false).to.be.true
      })
  })
})
