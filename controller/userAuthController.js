import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import userAuthTable from "../models/userAuthModel.js";

//user_Register_API

export const userRegister = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("Name and password are required");
  }

  const existingUser = await userAuthTable.findOne({ name });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with this name");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userAuthTable.create({ name, password: hashPassword });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: newUser._id,
      name: newUser.name,
    },
  });
});


//user_Login_API
export const userLogin = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    // Check for missing fields
    if (!name || !password) {
        res.status(400); // Bad Request
        throw new Error("Name and password are required");
    }

    // Find the user in the database by name
    const user = await userAuthTable.findOne({ name });

    // If user is not found, return a 404 error
    if (!user) {
        res.status(404); // Not Found
        throw new Error("User not found");
    }

    // Check if the password matches using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401); 
        throw new Error("Invalid password");
    }

    // Generate a JSON Web Token (JWT) for the user
    const accessToken = jwt.sign(
        {
            id: user._id,
            name: user.name,
        },
        process.env.JWT_SECRET, 
        { expiresIn: "1h" } // Token expiration time
    );

    // Send a success response with the access token
    res.status(200).json({
        message: "Login successful",
        accessToken,
        user: {
            id: user._id,
            name: user.name,
        },
    });
});


// Route handler to get the currently logged-in user info
export const curruntUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error("User not authenticated");
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user: req.user, // You can fetch full user from DB if needed
    });
});