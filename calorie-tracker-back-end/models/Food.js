const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
  name: {type: String, required: true},
  calories: {type: Number, required: true}
})

module.exports = mongoose.model('Food', foodSchema)
