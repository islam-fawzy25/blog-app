import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.scss"

export default function Menu({ cat }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts/`)
                setPosts(res.data.filter(post => post.cat === cat).slice(0,10))
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts()
    }, [cat])

    return (
        <div className="menu">
            {posts && posts.map(post => (
                <div className="post" key={post.id}>
                     <Link className="link" to={`/post/${post.id}`}> 
                        <img src={`../upload/${post.post_img}`} alt="" />
                        <h2>{post.title}</h2>
                        <button >Read More</button>
                     </Link> 
                </div>
            ))}
        </div>
    )
}