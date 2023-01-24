import db from "../db.js"
import Jwt from "jsonwebtoken"
export const getPosts = (req, res) => {
    db.connect()
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    try {
        db.connect()
        const postId = req.params.id
        const q = "SELECT * FROM users INNER JOIN posts ON users.id = posts.user_id WHERE posts.id=?";
        db.query(q, [postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        })
    } catch (error) {
        console.log(error);
    }
}
export const addPost = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    Jwt.verify(token, "jwtkey", (err, userInfo) => {
  
        if (err) return res.status(403).json("Token is not vaild!")
        const q = "INSERT INTO posts( title,description,post_img ,cat,date,user_id ) VALUES (?)"
        const values = [
            req.body.title,
            req.body.description,
            req.body.post_img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]
        console.log(values);
        db.connect()
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json("Post has been created.")
        })
    })
}
export const deletePost = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) return res.status(401).json("Not authenticated!")
        Jwt.verify(token, "jwtkey", (err, userInfo) => {
            if (err) return res.status(403).json("Token is not vaild!")
            const postId = req.params.id
            const q = "DELETE FROM posts WHERE id= ? AND user_id=?";
            db.connect()
            db.query(q, [postId, userInfo.id], (err, data) => {
                if (err) return res.status(403).json("You can only delete your post!")
                return res.json("Post has been deleted!")
            })
        })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (req, res) => {
    console.log("update post");
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    Jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not vaild!")
       console.log(req.body);
        const postId = req.params.id
        const q = "UPDATE  posts SET  title=?,description=?,post_img=? ,cat=? WHERE id=? AND user_id =? "
        const values = [
            req.body.title,
            req.body.description,
            req.body.post_img,
            req.body.cat,
        ]
        db.connect()
        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json("Post has been updated.")
        })
    })
}