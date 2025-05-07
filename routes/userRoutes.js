import express from "express";

import {
  deleteUserById,
  getUsers,
  getUsersById,
  postUsers,
  updateUsers
} from "../controller/userController.js";

const router = express.Router();

// GET all users
router.get('/', getUsers);

// GET user by ID
router.get('/:id', getUsersById);

// POST a new user
router.post('/post', postUsers);

// PUT (or PATCH) to update user by ID
router.put('/put/:id', updateUsers); // Or use .patch()

// DELETE user by ID
router.delete('/delete/:id', deleteUserById);

export default router;
