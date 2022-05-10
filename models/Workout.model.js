const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["cardio", "strength", "mobility"],
  },
  duration: {
    type: Number,
  },
  location: {
    type: String,
    required: true,
  },
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;