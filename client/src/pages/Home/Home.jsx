import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Home.scss";

export default function Home() {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(true)
    const cat = useLocation().search

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`http://localhost:8800/api/posts${cat}`)
                if (res.status === 200) {
                    console.log(res);
                    setLoading(false)
                    setError(false)
                    return setPosts(res.data)
                }
            } catch (error) {
                setLoading(false)
                setErrorMsg(error.message)
                return setError(true)
            }
        }
        fetchPosts()
    }, [cat]);
    console.log(error.length);

    return (
        <div className="home-container">
            <div className="posts">
                {loading && <h1>Loading...</h1>}
                {error && <h1>{errorMsg}</h1>}
                {!error && posts.map(post => (
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