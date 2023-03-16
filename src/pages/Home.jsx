import React, { useState } from 'react';
import Cards from '../components/Cards';
import Uploader from '../components/Uploader';
import '../style.css';

function Home() {
  const [modal, setModal] = useState(false);

  return (
    <div className='home-container'>
      <div className='headBanner'>
        <h1 className='headerTitle'>MONOHA GALLERY</h1>
        {modal ? 
          <button onClick={()=>{setModal(!modal)}}>닫기</button> : 
          <button onClick={()=>{setModal(!modal)}}>글쓰기</button>}
      </div>
        {modal ? <Uploader /> : null}
        <div className='wrapper'>
          <Cards />
        </div>
    </div>
  )
}

export default Home