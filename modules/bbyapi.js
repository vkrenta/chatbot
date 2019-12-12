// Import best buy
const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O')

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

getListOfCategories().then((items) => {
  console.log(items)
})

module.exports.getListOfCategories = getListOfCategories
