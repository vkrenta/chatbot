// Import best buy
const bby = require('bestbuy')(process.env.BEST_BUY_API_KEY)

async function getListOfCategories () {
  const listOfCategories = await bby.categories('', { show: 'id,name' })
    .then(function (data) {
      const list = []
      const categories = data.categories
      categories.forEach(element => {
        list.push(element.name)
      })
      return list
    })
  return listOfCategories
}

module.exports.getListOfCategories = getListOfCategories
