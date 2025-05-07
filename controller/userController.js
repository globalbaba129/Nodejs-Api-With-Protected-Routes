import UserTable from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await UserTable.find();
  res.status(200).json(users);
});

// Get user by ID
export const getUsersById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserTable.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// Create a new user
export const postUsers = asyncHandler(async (req, res) => {
  const { name, email, phone, image } = req.body;

  if (!name || !email || !phone || !image) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const newUser = await UserTable.create({ name, email, phone, image });
  res.status(201).json(newUser);
});

// Update a user by ID
export const updateUsers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, image } = req.body;

  const updatedUser = await UserTable.findByIdAndUpdate(
    id,
    { name, email, phone, image },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(updatedUser);
});

// Delete a user by ID
export const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await UserTable.findByIdAndDelete(id);
  if (!deletedUser) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "User deleted", deletedUser });
});
