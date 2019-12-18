const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  autoReconnect: true
})
  .then(() => {
    console.log('Yahoo, mongodb succefully connected')
  })
  .catch(err => {
    console.log('Ooops, its something wrong! ', err)
  })

module.exports = mongoose
