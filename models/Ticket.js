const mongoose = require("mongoose");
require("./User");

const schema = new mongoose.Schema({
  titile: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  priority: {
    type: Number,
    default: 3,
    enum: [1, 2, 3],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;
