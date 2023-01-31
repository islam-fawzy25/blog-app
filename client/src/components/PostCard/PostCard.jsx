import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PostCard.scss";
import editIcon from "../../img/edit.png";
import deleteIcon from "../../img/delete.png"
import moment from "moment";

export default function PostCard({ post, userPage, handleDelete }) {


    return (
        <div className="post-card-container">
            <div className="user-img">
                <img src={`../upload/${post?.post_img}`} alt="" />
            </div>
            <div className="content">
                <h6>{post?.title}</h6>
                <div className="info">
                    <p>Posted {moment(post.date).fromNow()}</p>
                    {userPage &&
                        <div className="edit">
                            <Link to={`/write?edit-post=${post.id}`} state={post}>
                                <img src={editIcon} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={deleteIcon} alt="" />
                        </div>
                    }
                </div>
                {/* <p className="descripton" dangerouslySetInnerHTML={{ __html: post.description }}></p> */}
            </div>



        </div>
    )
}