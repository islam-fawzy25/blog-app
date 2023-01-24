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
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }
    return (
        <div className="home-container">
            <div className="posts">
                {posts.map(post => (
                    <div className="post" key={post.id}>
                        <Link className="link" to={`/post/${post.id}`}>
                            <div className="img">
                                <img src={`../upload/${post.post_img}` } alt="" />
                            </div>
                            <div className="content">
                                <h1>{post.title}</h1>
                                <p>{post.description}</p>
                                <button> Read More</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}