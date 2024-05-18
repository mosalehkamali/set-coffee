const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("<<<🎇 MongoDB Connected Successfully 🎇>>>");
    }
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};

export default connectToDB;
