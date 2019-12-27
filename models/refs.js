const mongoose = require('../modules/mongoose')

const ReferralSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true
  },
  reflink: {
    type: String,
    require: true
  },
  clicks: {
    type: Number,
    require: true
  }
})

const refs = mongoose.model('refs', ReferralSchema)

module.exports = refs
