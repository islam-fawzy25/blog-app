import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import "./Write.scss";

export default function Write() {
    const state = useLocation().state
    console.log(state);
    const [value, setValue] = useState(state?.description || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");

    const upload = async () => {
        try {
            console.log(file === true);
            if(file){
                const formData = new FormData();
                formData.append("file", file);
                const res = await axios.post("http://localhost:8800/api/upload", formData, { withCredentials: true });
                return res.data
            }
          return "";
        } catch (err) {
            console.log(err);
        }
    };
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }

    const handleClick = async (e) => {
        e.preventDefault()
        const imgUrl = await upload()
        try {
            state ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
                title, description: value, cat, post_img: file ? imgUrl : ""
            }, { withCredentials: true })
                : await axios.post(`http://localhost:8800/api/posts/`, {
                    title, description: getText(value), cat, post_img: file? imgUrl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm")
                }, { withCredentials: true })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="write">
            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                <div className="editorContainer">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span><b>Status:</b> Draft</span>
                    <span><b>Visability:</b>Public </span>
                    <input style={{ display: "none" }} type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                    <label htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div>
                        <input type="radio" checked={cat.toLowerCase() === "art"} name="cat" value="Art" id="art" onChange={e => setCat(e.target.value)} />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div>
                        <input type="radio" checked={cat.toLowerCase() === "food"} name="cat" value="Food" id="Food" onChange={e => setCat(e.target.value)} />
                        <label htmlFor="Food">Food</label>
                    </div>
                    <div>
                        <input type="radio" checked={cat.toLowerCase() === "technology"} name="cat" value="Technology" id="Technology" onChange={e => setCat(e.target.value)} />
                        <label htmlFor="Technology">Technology</label>
                    </div>
                    <div>
                        <input type="radio" checked={cat.toLowerCase() === "since"} name="cat" value="Since" id="Since" onChange={e => setCat(e.target.value)} />
                        <label htmlFor="Since">Since</label>
                    </div>
                    <div>
                        <input type="radio" checked={cat.toLowerCase() === "sport"} name="cat" value="Sport" id="Sport" onChange={e => setCat(e.target.value)} />
                        <label htmlFor="Sport">Sport</label>
                    </div>
                </div>
            </div>

        </div>
    )
}