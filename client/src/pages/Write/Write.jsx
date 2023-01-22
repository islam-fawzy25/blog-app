import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Write.scss";

export default function Write() {
    const [value, setValue] = useState('');
    return (
        <div className="write">
            <div className="content">
                <input type="text" placeholder="Title" />
                <div className="editorContainer">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span><b>Status:</b> Draft</span>
                    <span><b>Visability:</b>Public </span>
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button>Update</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div>
                        <input type="radio" name="cat" value="art" id="art" />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div>
                        <input type="radio" name="cat" value="Food" id="Food" />
                        <label htmlFor="Food">Food</label>
                    </div>
                    <div>
                        <input type="radio" name="cat" value="Technology" id="Technology" />
                        <label htmlFor="Technology">Technology</label>
                    </div>
                    <div>
                        <input type="radio" name="cat" value="Since" id="Since" />
                        <label htmlFor="Since">Since</label>
                    </div>
                    <div>
                        <input type="radio" name="cat" value="Sport" id="Sport" />
                        <label htmlFor="Sport">Sport</label>
                    </div>
                </div>
            </div>

        </div>
    )
}