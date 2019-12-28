const mongoose = require('../modules/mongoose')
const findOrCreate = require('mongoose-findorcreate')

const ClickSchema = new mongoose.Schema({
  creatorId: {
    type: String,
    require: true
  },
  reflink: {
    type: String,
    require: true
  },
  userId: {
    type: String,
    require: true
  }
})

ClickSchema.plugin(findOrCreate)

const clicks = mongoose.model('clicks', ClickSchema)

module.exports = clicks

module.exports.createOrError = (query) => {
  return new Promise((resolve, reject) => {
    clicks.findOrCreate(query, (err, _success, created) => {
      if (err) reject(err)
      if (!created) reject(new Error('228')) // cannot activate referral link twice
      if (created) resolve(true)
    })
  })
}
