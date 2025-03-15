const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

const Authrouter = express.Router();

// Create New account 
Authrouter.post("/create-account", async (req, res) => {
    console.log("Received Request Body:", req.body);

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            error: true,
            message: "Please provide fullName, email and password"
        });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: true,
                message: "Email already registered"
            });
        }

        const newUser = new userModel({ fullName, email, password });
        const result = await newUser.save();

        const accessToken = jwt.sign({ id: result._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m"
        });

        return res.status(201).json({
            error: false,
            user: result,
            token: accessToken,
            message: "Registered successfully!"
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

// Login API
Authrouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const userInfo = await userModel.findOne({ email });

        if (!userInfo) {
            return res.status(400).json({ message: "User not found!!" });
        }

        if (userInfo.password === password) {
            const accessToken = jwt.sign({ id: userInfo._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "36000m"
            });

            return res.json({
                error: false,
                message: "Login Successfully",
                email,
                accessToken,
            });
        } else {
            return res.status(400).json({
                error: true,
                message: "Invalid Credentials!"
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

module.exports = Authrouter;
