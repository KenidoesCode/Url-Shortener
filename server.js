import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "./routes/url.js";
import Url from "./models/Url.js";

dotenv.config();

const app = express();


app.use(express.json());


app.use("/", urlRoutes);


mongoose
  .connect(process.env.MONGO_URI, {
  
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB Connected");

    try {
      await Url.collection.dropIndex("shortCode_1");
      console.log("🗑️ Dropped old shortCode index");
    } catch (err) {
      if (err.codeName === "IndexNotFound") {
        console.log("✅ No shortCode index found, all good");
      } else {
        console.error("❌ Error dropping index:", err.message);
      }
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

app.get("/", (req, res) => {
  res.send("API alive");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
