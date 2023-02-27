import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from "react-router-dom";
import "./Write.scss";

export default function Write() {
    const state = useLocation().state
    const [value, setValue] = useState(state ? state.description : "");
    const [title, setTitle] = useState(state ? state.title : "");
    const [file, setFile] = useState(state ? state.post_img : "");
    const [cat, setCat] = useState(state ? state.cat : "");
    const [isPublished, setIsPublished] = useState(state ? state.isPublished : 1);
    const navigate = useNavigate()

    const upload = async () => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await axios.post("http://localhost:8800/api/upload", formData, { withCredentials: true });
                return res.data
            }
            return state?.post_img;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault()
        const imgUrl = await upload()
        try {
            state ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
                title, description: value, cat, post_img: imgUrl, isPublished: isPublished
            }, { withCredentials: true })
                : await axios.post(`http://localhost:8800/api/posts/`, {
                    title, description: value, cat, post_img: imgUrl, date: moment(Date.now()).format("YYYY-MM-DD HH:mm"), isPublished: isPublished
                }, { withCredentials: true })
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
    }, [isPublished])

    return (
        <form onSubmit={handleClick} className="write">
            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} required minLength="4" />
                <div className="editorContainer">
                    <ReactQuill theme="snow" value={value} onChange={setValue} required />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <div>
                        <input type="radio" checked={isPublished == 1} name="Published" value={1} id="published" onChange={e => setIsPublished(e.target.value)} />
                        <label htmlFor="published"> Published</label>
                    </div>
                    <div>
                        <input type="radio" checked={isPublished == 0} name="Save as draft" value={0} id="save-as" onChange={e => setIsPublished(e.target.value)} />
                        <label htmlFor="save-as"> Save as draft</label>
                    </div>

                    <label htmlFor="file"><b>Upload Image</b> </label>
                    {/* Need check if there is  an img or not -- if we come to edit or to create new post  */}
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
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
                        <input type="radio" checked={cat.toLowerCase() === "science"} name="cat" value="Science" id="Science" onChange={e => setCat(e.target.value)} />
                        <label htmlFor="Science">Science</label>
                    </div>
                    <div>
                        <input type="radio" checked={cat.toLowerCase() === "sport"} name="cat" value="Sport" id="Sport" onChange={e => setCat(e.target.value)} />
                        <label htmlFor="Sport">Sport</label>
                    </div>
                </div>
                <div className="buttons">
                    <button type="submit">{isPublished == 1 ? "Publish" : "Save"}</button>
                </div>
            </div>
        </form>
    )
}