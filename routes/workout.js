var express = require("express");
const Workout = require("../models/Workout.model");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("WORKOUTS");
});

router.get("/all-workouts", (req, res) => {
  Workout.find()
    .then((allWorkouts) => {
      res.json(allWorkouts);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

router.post("/create", (req, res) => {
    console.log(req.body);
  Workout.create({
    name: req.body.name,
    type: req.body.type,
    duration: req.body.duration,
    location: req.body.location,
  })
    .then((createdWorkout) => {
      res.json(createdWorkout);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

module.exports = router;