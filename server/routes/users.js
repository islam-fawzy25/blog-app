import express from "express";
import { getUser, updateUser,geteUserPosts } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUser)
router.put("/:id", updateUser)
router.put("/posts", geteUserPosts)


export default router