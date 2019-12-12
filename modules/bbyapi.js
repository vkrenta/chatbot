// Import best buy
const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O')

function getListOfCategories(){
  let listOfCat = [];
  const a = bby.categories('',{show:'id,name'})
  .then(function(data){
    let categories = data.categories;
    categories.forEach(element => {
      listOfCat.push(element.name)
    });
    console.log(listOfCat);
  })
  
}

function getProductsByCategory(category){
  bby.products('categoryPath.name="' + category + '"',{show:'sku,name,salePrice'})
  .then(function(data){
    console.log(data);
  });
}

//getListOfCategories()
getProductsByCategory('Blu-ray & DVD Players')




