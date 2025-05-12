import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI as string;

export const connectionDb = async function connection() {
 try {
    const connected = await mongoose.connect(MONGO_URI);
    console.log("Connected to db")
    return connected
} catch (error: any) {
    console.error(error.message)
    process.exit(1)
}
} 