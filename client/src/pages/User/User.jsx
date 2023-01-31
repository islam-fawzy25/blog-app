import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./User.scss";
import { AuthContext } from "../../utilities/authContext";
import PostCard from "../../components/PostCard/PostCard";

export default function User() {
    const state = useLocation().state
    const { setCurrentUser,currentUser } = useContext(AuthContext)

    const [userName, setUserName] = useState(currentUser?.user_name);
    const [email, setEmail] = useState(currentUser?.email);
    const [file, setFile] = useState(currentUser?.user_img);
    const [posts,setPosts]=useState([])

    const getUserPosts=async()=>{
        try {
            const res= await axios.get("http://localhost:8800/api/users/posts")
            setPosts(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    getUserPosts()

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const img = await upload()
        try {
            const res = await axios.put(`http://localhost:8800/api/users/${currentUser.id}`,
                { user_name: userName, email: email, user_img: img ,id:state.id}, { withCredentials: true })
            if (res.status === 200) {return setCurrentUser(res.data.data) };
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
    },[currentUser])
    return (
        <section className="user-container">User Page
            <img src={`../upload/${currentUser?.user_img}`} alt="user-img" />
            <input type="text" value={userName} placeholder="User name" name="user_name"
                onChange={e => setUserName(e.target.value)} />
            <input type="email" value={email} placeholder="Email" name="email" onChange={e => setEmail(e.target.value)} />

            <label htmlFor="file"><b>Upload Image</b> </label>
            {/* Need check if there is  an img or not -- if we come to edit or to create new post  */}
            <input type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])} />
            {/* <input value={file} /> */}

            <button type="submit" onClick={handleSubmit} >Update</button>
            <div>
                Posts
                {posts && posts.map(post=>(<div key={post.id}>
                    <PostCard post={post} userPage={true} />
                </div>))}
            </div>
        </section>
    )
}