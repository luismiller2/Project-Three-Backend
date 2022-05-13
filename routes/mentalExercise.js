var express = require("express");
const MentalExercise = require("../models/MentalExercise.model");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  axios
        .get(`https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple`)
        .then((results) => {
            console.log(results)
            res.json(results.data)})
        
        .catch((err) => console.log(err.message))
});

router.get("/all-mental-exercises", (req, res) => {
  MentalExercise.find()
    .then((allMentalExercises) => {
      res.json(allMentalExercises);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

router.post("/create", (req, res) => {
    console.log(req.body);
  MentalExercise.create({
    amount: req.body.amount,
    category: req.body.category,
    difficulty: req.body.difficulty,
    type: req.body.type,
  })
    .then((createdMentalExercise) => {
      res.json(createdMentalExercise);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

router.get("/:id/edit", (req, res, next) => {
  MentalExercise.findById(req.params.id)
    .then(function (results) {
      res.json(results);
    })
    .catch(function (error) {
      console.log("Something went wrong", error.message);
    });

});

router.post("/:id/edit", (req, res, next) => {
  MentalExercise.findByIdAndUpdate(req.params.id, {
    amount: req.body.amount,
    category: req.body.category,
    difficulty: req.body.difficulty,
    type: req.body.type,
  }, {new:true})
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

router.post("/:id/delete", (req, res, next) => {
  MentalExercise.findByIdAndRemove(req.params.id)
    .then(function (results) {
      res.redirect(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

module.exports = router;