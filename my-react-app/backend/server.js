const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config");
const User = require("./models/User");

const app = express();

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
        console.error("Signup error:", error);

        res.status(500).json({
            message: "Error"
        });
    }
});

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Backend is running successfully 🚀"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy"
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});