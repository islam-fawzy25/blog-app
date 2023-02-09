import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./User.scss";
import { AuthContext } from "../../utilities/authContext";
import PostCard from "../../components/PostCard/PostCard";

export default function User() {
    const state = useLocation().state
    const { setCurrentUser, currentUser } = useContext(AuthContext)

    const [userName, setUserName] = useState(currentUser?.user_name);
    const [email, setEmail] = useState(currentUser?.email);
    const [file, setFile] = useState(currentUser?.user_img);
    const [posts, setPosts] = useState([])
    const [postId, setPostId] = useState()

    const getUserPosts = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/api/users/posts/${currentUser.id}`)
            setPosts(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("http://localhost:8800/api/upload", formData, { withCredentials: true });
            return res.data
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.put(`http://localhost:8800/api/users/deactivate-post/${id}`, { isActive: 0 }, { withCredentials: true })

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const img = await upload()
        try {
            const res = await axios.put(`http://localhost:8800/api/users/${currentUser.id}`,
                { user_name: userName, email: email, user_img: img, id: state.id }, { withCredentials: true })
            if (res.status === 200) { return setCurrentUser(res.data.data) };
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserPosts()
    }, [currentUser,handleDelete])

    return (
        <div className="user-container">
            <section className="user-info-container">
                User Page
                <img className="user-img" src={`../upload/${currentUser?.user_img}`} alt="user-img" />
                <label htmlFor=""><b> Name:</b> </label>
                <input type="text" value={userName} placeholder="User name" name="user_name"
                    onChange={e => setUserName(e.target.value)} />
                <label htmlFor=""><b>Email:</b> </label>
                <input type="email" value={email} placeholder="Email" name="email" onChange={e => setEmail(e.target.value)} />
                <label htmlFor="file"><b>Upload Image</b> </label>
                <input type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])} />
                <button type="submit" onClick={handleSubmit} >Update</button>
            </section>
            <hr></hr>
            <p>User Posts</p>
            <hr />
            <div className="user-posts-container">
                {posts && posts.map(post => (<div key={post.id}>
                    <PostCard post={post} userPage={true} setPostId={setPostId}
                        handleDelete={handleDelete} linkTo={`/write?edit-post=${post.id}`}
                    />
                </div>))}
            </div>
        </div>
    )
}