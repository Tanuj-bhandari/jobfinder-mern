import express from "express";
import { getSavedJobs, login, logout, register, saveJob, updateLocation, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/savejob/:jobId").get(isAuthenticated,saveJob);
router.route("/getSavedJobs").get(isAuthenticated,getSavedJobs);
// router.route("/update-location/:userId").post(updateLocation);

export default router;
