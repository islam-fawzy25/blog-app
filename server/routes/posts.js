import express from "express";
import { getPost, getPosts, addPost, deletePost, updatePost,getRelatedPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts)
router.get("/:id", getPost)
router.get("/relatedPosts/:id", getRelatedPosts)
router.post("/", addPost)
router.put("/:id", updatePost)


router.delete("/:id", deletePost)


export default router