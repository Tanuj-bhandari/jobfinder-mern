
import express from "express";
import { adminRegister, adminLogin, adminLogout } from "../controllers/admin.controller.js";

const router = express.Router();


router.route("/register").post(adminRegister);
router.route("/login").post(adminLogin);
router.route("/logout").post(adminLogout);

export default router;
