import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Home.scss";

export default function Home() {
    const [posts, setPosts] = useState([])
    const cat = useLocation().search
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts${cat}`)
                if (res.status === 200) {
                    return setPosts(res.data)
                }
                console.log(res);
                // else handle error
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts()
    }, [cat]);

    return (
        <div className="home-container">
            <div className="posts">
                {posts.length > 0 && posts.map(post => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.post_img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h3>{post.title}</h3>
                                <p>By <b>{post.user_name}</b> on {post.post_created_date.split("T")[0]}</p>
                                <div className="content-description" dangerouslySetInnerHTML={{ __html: post.description }}></div>
                                <button> Read More</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}