const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, "../client")));  

// API Routes
const postsRoutes = require("./routes/posts");
app.use("/api/posts", postsRoutes);

// Fallback Route (Serves index.html for any unknown route)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
