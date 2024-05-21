const { default: mongoose } = require("mongoose");
require("./Product");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: () => Date.now(),
      immutable: false,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

module.exports = model;
