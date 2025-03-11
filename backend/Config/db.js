import chalk from "chalk";
import mongoose from "mongoose";
import { envVars } from "./envVars.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(envVars.MONGODB_URI);
        console.log(chalk.green(`MongoDB connected: ${conn.connection.host}`));
    } catch (error) {
        console.error(chalk.red("Error connecting to MongoDB: " + error.message));
        process.exit(1);
    }
};