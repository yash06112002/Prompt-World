import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected.")
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompt_world",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("MongoDB is connected.");

    }
    catch (err) {
        console.log("Error connecting to MongoDB:", err);
        return;
    }
}