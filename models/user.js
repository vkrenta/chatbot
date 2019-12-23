const mongoose = require('../modules/mongoose')

const OrderSchema = new mongoose.Schema({
  convId: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const orders = mongoose.model('orders', OrderSchema)

module.exports.orders = orders
