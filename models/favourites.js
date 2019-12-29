const mongoose = require('../modules/mongoose')
const findOrCreate = require('mongoose-findorcreate')

const FavouritesSchema = new mongoose.Schema({
  convId: {
    type: String,
    require: true
  },
  sku: {
    type: String,
    require: true
  }
})
FavouritesSchema.plugin(findOrCreate)

const favourites = mongoose.model('favourites', FavouritesSchema)

module.exports = favourites
