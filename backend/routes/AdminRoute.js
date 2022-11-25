import express from "express";
import {
  getUserAdmin,
  Register,
  Login,
  Logout,
} from "../controllers/AdminController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/useradmin", verifyToken, getUserAdmin);
router.post("/usersadmin", Register,verifyToken,getUserAdmin);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
