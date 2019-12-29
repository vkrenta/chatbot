const mongoose = require('../modules/mongoose')
const findOrCreate = require('mongoose-findorcreate')

const FavouritesSchema = new mongoose.Schema({
  sku: {
    type: String,
    require: true
  }
})
FavouritesSchema.plugin(findOrCreate)

const favourites = mongoose.model('refs', FavouritesSchema)

module.exports = favourites
