const { Schema, model } = require("mongoose");

const spiritualSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  book: {
    type: String,
    enum: ["bible", "quran", "torah"],
  },
  takeaway: {
    type: String,
    required: true,
  },
});

const Spiritual = model("Spiritual", spiritualSchema);

module.exports = Spiritual;