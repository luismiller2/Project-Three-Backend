const { Schema, model } = require("mongoose");

const mentalExerciseSchema = new Schema({
  challenge: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    enum: ["javascript", "react", "c++", "python"],
  },
  rank: {
    type: String,
    required: true,
  },
});

const MentalExercise = model("MentalExercise", mentalExerciseSchema);

module.exports = MentalExercise;