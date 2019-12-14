// Import best buy and env vars
require('dotenv').config()
const bby = require('bestbuy')(process.env.BEST_BUY_API_KEY)

async function getListOfCategories () {
  const listOfCategories = await bby.categories('', { show: 'id,name' })
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

module.exports = {
  getListOfCategories: getListOfCategories,
  getProductsByCategory: getProductsByCategory
}
