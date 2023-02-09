import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.scss";
import editIcon from "../../img/edit.png";
import deleteIcon from "../../img/delete.png"

export default function PostCard({ post, userPage, handleDelete ,setPostId,linkTo}) {

    return (
        <div className="post-card-container">
            {userPage &&
                <div className="edit">
                    <Link to={linkTo} state={post}>
                        <img src={editIcon} alt="" />
                    </Link>
                    <img onClick={()=>{ 
                        handleDelete(post.id)
                       // setPostId(post.id)
                        }} src={deleteIcon} alt="" />
                </div>
            }
            <Link className="link" to={linkTo} state={post}>
                <div className="img" >
                    <img src={`../upload/${post.post_img}`} alt="" />
                </div>
                <div className="content">
                    <h2>{post.title}</h2>
                    <p>Status: {post.isPublished? "Published":"Saved"}</p>
                    <p>{post.post_created_date}</p>
                    <button >Read More</button>
                </div>
            </Link>
        </div >
    )
}

