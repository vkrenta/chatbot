const mongoosePaginate = require('mongoose-paginate-v2')
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

OrderSchema.plugin(mongoosePaginate)

const orders = mongoose.model('orders', OrderSchema)

module.exports = orders

module.exports.getDocs = (convId, page, limit) => {
  return new Promise((resolve, reject) => {
    const query = {
      limit: limit,
      page: page,
      select: 'sku date',
      sort: { date: -1 }
    }
    orders.paginate({ convId: convId }, query, (err, result) => {
      if (err) reject(err)
      resolve(result.docs)
    })
  })
}
