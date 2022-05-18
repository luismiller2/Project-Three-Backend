const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;