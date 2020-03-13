/******************************************************************************
                            DEPENDENCIES
******************************************************************************/

const express = require('express')
const app = express()
const PORT = 3003
const foodController = require('./controllers/food.js')
const mongoose = require('mongoose')







/*****************************************************************************
                              MIDDLEWARE
******************************************************************************/
app.use(express.json())




/******************************************************************************
                        MONGOOSE CONNECTION
******************************************************************************/

mongoose.connection.on('error', error => {console.log(error.message + 'remember to run mongo or something')})
mongoose.connection.on('disconnected', () => console.log('we are disconnected'))

mongoose.connect('mongodb://localhost:27017/foods', {useUnifiedTopology:true, useNewUrlParser: true})

mongoose.connection.once('open', () => {
  console.log('connected to mongoose');
})







/******************************************************************************
                          ROUTES - BELOW
*******************************************************************************/

app.use('/foods', foodController)




/******************************************************************************
                          LISTENER
*******************************************************************************/

app.listen(PORT, () => {
  console.log('🎉🎊', 'listening on port', PORT, '🎉🎊',);
})
