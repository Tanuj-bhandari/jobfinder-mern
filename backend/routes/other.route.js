import express from "express";
import { createOther } from "../controllers/other.controller.js";
import { singleUpload } from "../middlewares/multer.js"; 
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();


router.route("/uploadFile").post(isAuthenticated,singleUpload, createOther);

export default router;
