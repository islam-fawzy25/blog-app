import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss"

interface RelatedPosts{
    relatedPosts:Post[]
}

interface Post{
    id:number
    post_img:string
    title:string
}

export default function Menu({ relatedPosts }:RelatedPosts) {
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