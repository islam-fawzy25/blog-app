import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss"

export default function Menu({ relatedPosts }) {
    return (
        <div className="menu">
            <h2>you may like</h2>
            {relatedPosts && relatedPosts.map(post => (
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