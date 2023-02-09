import db from "../db.js"
import Jwt from "jsonwebtoken"

const filterQuery=" AND posts.isActive=1 AND posts.isBlocked=0"

export const geteUserPosts = (req, res) => {
    try {
        const userId = req.params.id
        db.connect()
        const q = `SELECT * FROM users INNER JOIN posts ON users.id = posts.user_id WHERE users.id=? ${filterQuery} `;
        db.query(q, [userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    } catch (error) {
        console.log(error);
    }
}
export const getUser = (req, res) => {
    try {
        db.connect()
        let q = "SELECT * FROM posts ORDER BY date DESC"
        if (req.query.cat) { q = "SELECT * FROM posts WHERE cat=? ORDER BY date DESC" }
        db.query(q, [req.query.cat], (err, data) => {
            if (err) return res.send(err);
            return res.status(200).json(data);
        })
    } catch (error) {
        console.log(error);

    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const q = "UPDATE  users SET  user_name=?,email=?,user_img=?  WHERE id=? "
        const values = [
            req.body.user_name,
            req.body.email,
            req.body.user_img,
        ]
        const token = Jwt.sign({id:userId}, "jwtkey")

        db.connect()
        db.query(q, [...values, userId], async (err, data) => {
            if (err) return res.status(500).json(err)
            return res.cookie("access_token", token, { httpOnly: true }).status(200).json({
                message: "User has been updated.",
                data: {
                    user_name: req.body.user_name,
                    email: req.body.email,
                    user_img: req.body.user_img,
                    id: req.body.id
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
}

export const deactivatePost = (req, res) => {
    try {
        console.log("deactivate");
        console.log(req.body);
        const token = req.cookies.access_token
        if (!token) return res.status(401).json("Not authenticated!")
        Jwt.verify(token, "jwtkey", (err, userInfo) => {
            if (err) return res.status(403).json("Token is not vaild!")
           
            const postId = req.params.id
            const q = "UPDATE  posts SET  isActive=? WHERE id=? AND user_id =?"
            const values = [req.body.isActive]
            db.connect()
            db.query(q, [values, postId, userInfo.id], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.json("Post has been updated.")
            })
        })
    } catch (error) {
        console.log(error);

    }
}