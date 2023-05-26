import mongoose from "mongoose";
import clc from "cli-color";
import env from "./env";

const connectDb = async () => {
  try {
    await mongoose.connect(env.DB_URI);
    console.log(clc.cyan("connected to the mongo database with success"));
  } catch (err) {
    console.log(clc.red("db connection error"));
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
