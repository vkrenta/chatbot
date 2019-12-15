// Import best buy and env vars
require('dotenv').config()
const bby = require('bestbuy')(process.env.BEST_BUY_API_KEY)

async function getTotalProducts () {
  const totalOfProd = await bby.categories('', { show: '', pageSize: 1 })
    .then(data => {
      const total = data.total
      return total
    })
    .catch(() => {
      return null
    })
  return totalOfProd
}

async function getTotalCategories () {
  const totalOfCat = await bby.categories('', { show: '', pageSize: 1 })
    .then(data => {
      const total = data.total
      return total
    })
    .catch(() => {
      return null
    })
  return totalOfCat
}

async function getListOfCategories () {
  const listOfCategories = await bby.categories('', { show: 'id,name', page: 1, pageSize: 10 })
    .then(function (data) {
      const list = []
      const categories = data.categories
      categories.forEach(element => {
        list.push(element)
      })
      return list
    })
    .catch(() => {
      return null
    })
  return listOfCategories
}

async function getProductsByCategory (id) {
  const listOfProducts = await bby.products(`categoryPath.id=${id}`, { show: 'sku,name' })
    .then((data) => {
      const list = []
      const products = data.products
      products.forEach(element => {
        list.push(element)
      })
      return list
    })
    .catch(() => {
      return null
    })
  return listOfProducts
}

async function getProductBySku (sku) {
  const product = await bby.products(`sku=${sku}`, { show: 'sku,name,image,salePrice' })
    .then(data => {
      const item = data.products[0]
      return item
    })
    .catch(() => {
      return null
    })
  return product
}

module.exports = {
  getListOfCategories: getListOfCategories,
  getProductsByCategory: getProductsByCategory,
  getProductBySku: getProductBySku,
  getTotalCategories: getTotalCategories,
  getTotalProducts: getTotalProducts
}
