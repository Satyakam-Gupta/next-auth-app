import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection; 

        connection.on("connected", (err) => {
            console.log("Connected to MongoDB successfully");
        });

        connection.on("error", (err) => {
            console.error("MongoDB connection error. Pleace make sure that MongoDB is running and the connection URI is correct." + err);
            process.exit();
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:");
        console.error(error)
    }
}