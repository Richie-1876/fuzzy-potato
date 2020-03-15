const express = require("express");
const food = express.Router();
const Food = require("../models/Food.js");
// curl -X POST -H "Content-Type: application/json" -d '{"name":"pork", "calories": 400}' http://localhost:3003/foods
// curl -X DELETE -H "Content-Type: application/json" -d '{"name":"pork", "calories": 400}' http://localhost:3003/foods/
// curl -X PUT -H "Content-Type: application/json" -d '{"name":"pork", "calories": 400}' http://localhost:3003/foods/
// curl -X PUT -H "Content-Type: application/json" -d '{"name":"I updated this"}' http://localhost:3003/foods/5e6bf81af379d00b48dd5547
/**********************INDEX ROUTE**************************************/

food.get("/", (req, res) => {
  Food.find({}, (error, foundFoods) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundFoods);
  });
});

/*********************Create Route******************/

food.post("/", async (req, res) => {
  Food.create(req.body, (error, createdFood) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(createdFood);
  });
});

/**********************DELETE ROUTE***************************************/
food.delete("/:id", (req, res) => {
  Food.findByIdAndRemove(req.params.id, (error, deletedFood) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(deletedFood);
  });
});

/*********************UPDATE ROUTE******************************************/
food.put("/:id", (req, res) => {
  console.log(req.body);
  Food.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true},
    (error, updatedFood) =>{
      console.log(error);
      if(error){
        res.status(400).json({ error: error.message })
      }
      res.status(200).json(updatedFood)
    }
  )
})



module.exports = food;
