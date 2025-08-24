import express from "express";
import validUrl from "valid-url";
import shortid from "shortid";
import Url from "../models/Url.js";

const router = express.Router();

console.log("🚀 URL Shortener API is running");

// =======================
// @route   POST /shorten
// @desc    Create short URL
// =======================
router.post("/shorten", async (req, res) => {
  try {
    if (!req.body || !req.body.longUrl) {
      console.log("⚠️ Missing longUrl in request body");
      return res.status(400).json({ error: "longUrl is required in request body" });
    }

    const { longUrl } = req.body;
    console.log("🔥 Received request to shorten:", longUrl);

    const baseUrl = "http://localhost:5000";

    if (!validUrl.isUri(baseUrl)) {
      console.error("❌ Invalid base URL:", baseUrl);
      return res.status(401).json({ error: "Invalid base URL" });
    }

    
    const urlCode = shortid.generate();

   
    if (!validUrl.isUri(longUrl)) {
      console.error("❌ Invalid longUrl provided:", longUrl);
      return res.status(401).json({ error: "Invalid longUrl" });
    }

    
    let url = await Url.findOne({ longUrl });
    if (url) {
      console.log("✅ URL already exists:", url);
      return res.json(url);
    }

    const shortUrl = `${baseUrl}/${urlCode}`;
    url = new Url({
      longUrl,
      shortUrl,
      urlCode,
      date: new Date(),
    });

    await url.save();
    console.log("✅ New URL saved:", url);
    res.json(url);

  } catch (err) {
    console.error("❌ Error in /shorten route:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// =======================
// @route   GET /:code
// @desc    Redirect to long URL
// =======================
router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    console.log("➡️ Redirect request for code:", code);

    const url = await Url.findOne({ urlCode: code });

    if (url) {
      console.log("🔗 Redirecting to:", url.longUrl);
      return res.redirect(url.longUrl);
    } else {
      console.warn("⚠️ No URL found for code:", code);
      return res.status(404).json({ error: "No URL found" });
    }
  } catch (err) {
    console.error("❌ Error in redirect route:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
