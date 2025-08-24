# 🔗 URL Shortener

A simple yet powerful **URL Shortener** built with **Node.js**, **Express**, and **MongoDB**.  
This project was written **line by line entirely by me**, using **ChatGPT only for debugging help** — and **strictly no YouTube tutorials**. Through this, I strengthened my knowledge of **backend development**, especially with Node, Express, and MongoDB. 🚀

---

## ✨ Features

- 🔗 Shorten any valid URL into a compact shareable link  
- ↩️ Redirect short URLs back to the original link  
- 📦 Prevents duplicate entries (same long URL → same short code)  
- 🗄️ MongoDB storage for persistence  
- ⚡ Clean backend API design  
- 🛠️ Built completely from scratch, self-driven  

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework  
- **MongoDB** – NoSQL database for storing URLs  
- **Mongoose** – Elegant MongoDB object modeling  

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
npm install

 Create a .env file and add your MongoDB connection string:

MONGO_URI=your_mongodb_connection
PORT=5000

npm run dev
📌 API Endpoints
➡️ Shorten a URL

POST /shorten

{
  "longUrl": "https://example.com"
}


✅ Returns:

{
  "urlCode": "abc123",
  "longUrl": "https://example.com",
  "shortUrl": "http://localhost:5000/abc123",
  "date": "2025-08-24T19:13:02.861Z"
}

➡️ Redirect to Original URL

GET /:code

Example: http://localhost:5000/abc123 → redirects to https://example.com

🎯 What I Learned

📚 Backend fundamentals with Node.js & Express

🗄️ Schema design & indexing in MongoDB

🧩 REST API development & testing with cURL/Thunder Client

🐛 Debugging complex issues independently (with ChatGPT guidance only)

🚫 Building without tutorials → deeper real understanding

🤝 Contributing

Contributions are welcome! Feel free to fork the repo, create a branch, and submit a PR.

git clone https://github.com/your-username/url-shortener.git
cd url-shortener
