const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config");
const User = require("./models/User");

const app = express();

// Initialize database connection
connectDB().catch(err => console.error("Database initialization failed:", err));

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error"
        });
    }
});

app.get("/", (req, res) => {
    res.send("Backend is running successfully 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});