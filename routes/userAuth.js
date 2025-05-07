import express from "express";
import { curruntUser, userLogin, userRegister } from "../controller/userAuthController.js";
import { tokenHandler } from "../middleware/TokenErrorHandler.js";

const router = express.Router();

// Register new user
router.post('/register', userRegister);

// User login
router.post('/userLogin', userLogin);

// Get current logged-in user (Protected Route)
router.get('/currentUser', tokenHandler, curruntUser);

export default router;
