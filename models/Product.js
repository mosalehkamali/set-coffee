const { default: mongoose } = require("mongoose");
require("./Comment");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    suitableFor: {
      type: String,
      required: true,
    },
    smell: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
      required:false,
    },
    category: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "product",
});

const model = mongoose.models.Product || mongoose.model("Product", schema);

module.exports = model;
