const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expTime: {
      type: Number,
      required: true,
    },
    useTimes: {
      type: Number,
      default: 0,
    },
    maxUse: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Otp || mongoose.model("Otp", schema);

module.exports = model;
