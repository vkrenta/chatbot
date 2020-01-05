/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha')
const assert = require('assert')
const { expect } = require('chai')
const bby = require('../modules/bbyapi')

describe('Testing BestBuy API: ', () => {
  it('Get total products by category', () => {
    return bby.getTotalProducts('abcat0102000')
      .then((data) => {
        console.log(`Total products : ${data}`)
        expect(data !== null).to.be.true
      })
      .catch(err => {
        console.error(err.status, err.statusText)
        assert.fail(err)
      })
  })

  it('Get total categories ', () => {
    return bby.getTotalCategories()
      .then((data) => {
        console.log(`Total categories : ${data}`)
        expect(data !== null).to.be.true
      })
      .catch(err => {
        console.error(err.status, err.statusText)
        assert.fail(err)
      })
  })

  it('Get list of all categories: ', () => {
    return bby.getListOfCategories(1, 10)
      .then((data) => {
        console.log('Categories: ')
        console.log(data)
        expect(data !== null).to.be.true
      })
      .catch(err => {
        console.error(err.status, err.statusText)
        assert.fail(err)
      })
  })

  it('Get products by category id: ', () => {
    return bby.getProductsByCategory('abcat0102000', 1, 4)
      .then(data => {
        console.log('Products: ')
        console.log(data)
        expect(data !== null).to.be.true
      })
      .catch(err => {
        console.error(err.status, err.statusText)
        assert.fail(err)
      })
  })

  it('Get product by sku: ', () => {
    return bby.getProductBySku(4743301)
      .then(data => {
        console.log('Product with sku 4743301: ')
        console.log(data)
        expect(data !== null).to.be.true
      })
      .catch(err => {
        console.error(err.status, err.statusText)
        assert.fail(err)
      })
  })
})
