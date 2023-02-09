import express from "express";
import { getUser, updateUser,geteUserPosts,deactivatePost } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUser)
router.put("/:id", updateUser)
router.get("/posts/:id", geteUserPosts)
router.put("/deactivate-post/:id", deactivatePost)

export default router