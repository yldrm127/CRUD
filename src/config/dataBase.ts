import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB bağlantısı başarılı");
  } catch (error) {
    console.log("MongoDB bağlantı hatası:", error);
    process.exit(1);
  }
};