const mongoose = require('../modules/mongoose')
const findOrCreate = require('mongoose-findorcreate')

const ReferralSchema = new mongoose.Schema({
  creatorId: {
    type: String,
    require: true
  },
  reflink: {
    type: String,
    require: true
  }
})
ReferralSchema.plugin(findOrCreate)

const refs = mongoose.model('refs', ReferralSchema)

module.exports = refs
