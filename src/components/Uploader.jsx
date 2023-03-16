import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { __newCard } from '../rtk/modules/module'

function Uploader() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState("");

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);

        return new Promise((resolve) => {
            reader.onload = () => {
                setImg(reader.result);
                resolve();
            }
        })
    }
    
return (
    <form className='uploaderWrapper'>
        <div>
            <label htmlFor="title">제목 : </label>
            <input type="text" placeholder="제목을 입력하세요" onChange={(e)=>{
                setTitle(e.target.value);
            }}/> &nbsp;
        </div>
        <div>
            <label htmlFor="content">내용 : </label>
            <input type="text" placeholder="내용을 입력하세요" onChange={(e)=>{
                setContent(e.target.value);
            }}/> &nbsp;
            </div>
        <div>
            <input type="file" onChange={(e)=>{
                encodeFileToBase64(e.target.files[0]);
            }}/>
        </div>
        <div>
            <button onClick={(e)=>{
                e.preventDefault();
                dispatch(__newCard({title, content, img, edit: false}));
                window.location.href="/"
            }}>작성</button>
        </div>
    </form>
    )
}

export default Uploader