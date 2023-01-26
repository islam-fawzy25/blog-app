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
                setPosts(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts()
    }, [cat])
;
    return (
        <div className="home-container">
            <div className="posts">
                {posts.map(post => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.post_img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                                <div dangerouslySetInnerHTML={{__html: post.description}}></div>
                                <button> Read More</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}