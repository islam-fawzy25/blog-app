import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.scss";
import editIcon from "../../img/edit.png";
import deleteIcon from "../../img/delete.png"

export default function PostCard({ post, userPage, handleDelete }) {

    return (
        <div className="post-card-container">
            <div className="img-container" >
                <div className="img" >
                    {/* <Link className="link" to={`/post/${post.id}`}>  */}
                    <img src={`../upload/${post.post_img}`} alt="" />
                </div>
                <div className="edit-container">
                    {userPage &&
                        <div className="edit">
                            <Link to={`/write?edit-post=${post.id}`} state={post}>
                                <img src={editIcon} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={deleteIcon} alt="" />
                        </div>
                    }
                    {/* </Link>  */}
                </div>
            </div>

            <div className="content">
                <h2>{post.title}</h2>
                <button >Read More</button>
            </div>
        </div>
    )
}

