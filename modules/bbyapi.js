// Import best buy and env vars
require('dotenv').config()
const bby = require('bestbuy')(process.env.BEST_BUY_API_KEY)

module.exports.getTotalProducts = (categoryPathID) => {
  return bby.products(`categoryPath.id=${categoryPathID}`, { show: '', pageSize: 1 })
    .then(data => {
      const total = data.total
      return total
    })
}

module.exports.getTotalCategories = () => {
  return bby.categories('', { show: '', pageSize: 1 })
    .then(data => {
      const total = data.total
      return total
    })
}

module.exports.getListOfCategories = (page, pageSize) => {
  return bby.categories('', { show: 'id,name', page, pageSize })
    .then(function (data) {
      const list = []
      const categories = data.categories
      categories.forEach(element => {
        list.push(element)
      })
      return list
    })
}

module.exports.getProductsByCategory = (id, page, pageSize) => {
  return bby.products(`categoryPath.id=${id}`,
    { show: 'sku,name,image,salePrice', page, pageSize })
    .then((data) => {
      const list = []
      const products = data.products
      products.forEach(element => {
        list.push(element)
      })
      return list
    })
}

module.exports.getProductBySku = (sku) => {
  return bby.products(`sku=${sku}`,
    { show: 'sku,name,image,manufacturer,shortDescription,warrantyLabor,salePrice' })
    .then(data => {
      const item = data.products[0]
      return item
    })
}
