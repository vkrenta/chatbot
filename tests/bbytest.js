/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha')
const { expect } = require('chai')
const bby = require('../modules/bbyapi')

describe('Testing BestBuy API: ', () => {
  it('Get total products ', async () => {
    await bby.getTotalProducts()
      .then((data) => {
        console.log(`Total products : ${data}`)
        expect(data !== null).to.be.true
      })
      .catch((err) => {
        console.warn(err)
        expect(false).to.be.true
      })
  })

  it('Get total categories ', async () => {
    await bby.getTotalCategories()
      .then((data) => {
        console.log(`Total categories : ${data}`)
        expect(data !== null).to.be.true
      })
      .catch((err) => {
        console.warn(err)
        expect(false).to.be.true
      })
  })

  it('Get list of all categories: ', async () => {
    await bby.getListOfCategories()
      .then((data) => {
        console.log('First 10 categories: ')
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
        console.log('First 10 products: ')
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
        console.log('Product with sku 4743301: ')
        console.log(data)
        expect(data !== null).to.be.true
      })
      .catch(err => {
        console.warn(err)
        expect(false).to.be.true
      })
  })
})
