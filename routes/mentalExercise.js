var express = require("express");
const MentalExercise = require("../models/MentalExercise.model");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  axios
        .get(`https://www.codewars.com/api/v1/code-challenges/{challenge}`)
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
    challenge: req.body.challenge,
    languages: req.body.languages,
    rank: req.body.rank,
  })
    .then((createdMentalExercise) => {
      res.json(createdMentalExercise);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

module.exports = router;