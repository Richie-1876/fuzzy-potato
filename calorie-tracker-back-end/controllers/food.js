const express = require('express')
const food = express.Router()
const Food = require('../models/Food.js')
// curl -X POST -H "Content-Type: application/json" -d '{"name":"pork", "calories": 400}' http://localhost:3003/foods
/**********************INDEX ROUTE**************************************/

food.get('/', (req,res) => {
  Food.find({}, (error, foundFoods) => {
    if(error) {
      res.status(400).json({error:err.message})
    }
    res.status(200).json(foundFoods)
  })
})

/*********************Create Route******************/

food.post('/', async(req,res) => {
  Food.create(req.body, (error, createdFood) => {
    if (error) {
      res.status(400).json({error:error.message})
    }
    res.status(200).json(createdFood)
  })
})



/**********************DELETE ROUTE***************************************/



/*********************UPDATE ROUTE******************************************/


module.exports = food
