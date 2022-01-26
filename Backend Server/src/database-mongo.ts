import mongoose from "mongoose";

async function connectMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://sci_iot:sci_iot_password@cluster0.rj0if.mongodb.net/SCI?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB.");
  } catch (e) {
    console.log("Error on MongoDB connection.");
    console.log(e);
  }
}

export default connectMongoDB;
