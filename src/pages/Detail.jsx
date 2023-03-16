import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __deleteCard, __fixCard, __editState, __getCards } from '../rtk/modules/module';

function Detail() {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fixTitle, setFixTitle] = useState('');
  const [fixContent, setFixContent] = useState('');
  const cards = useSelector((state) => state.cards.cards);

  const findCard = cards.find((item) => {
    return item?.id === parseInt(param.id);
  })

  useEffect(()=>{
    dispatch(__getCards())
  },[])

  return (
    <div className='detailCardWrapper'>
      <div className='detailBtn'>
        <div>
          <span onClick={()=>{navigate("/")}}>뒤로가기</span>
        </div>
        <div className='detailFixBtn'>
          {findCard?.edit ? 
            <span onClick={()=>{
              dispatch(__fixCard({id: findCard.id, fixTitle, fixContent, img: findCard.img, edit: false}))
              window.location.href=`/detail/${findCard.id}`
            }}>수정완료</span>
            : 
            <span onClick={()=>{
              dispatch(__editState(findCard?.id))
            }}>수정</span>
          }
          <span onClick={()=>{
            dispatch(__deleteCard(findCard?.id));
            window.location.href="/"
          }}>삭제</span>
        </div>
      </div>
      <div className='detailCard'>
        <div>
          <img src={findCard?.img} alt="" />
        </div>
        {findCard?.edit ? 
          <div>
            <input type="text" value={fixTitle} placeholder="수정할 제목을 입력하세요" onChange={(e)=>{setFixTitle(e.target.value)}}/>
            <input type="text" value={fixContent} placeholder="수정할 내용을 입력하세요" onChange={(e)=>{setFixContent(e.target.value)}}/>
          </div>
          :
          <div>
            <h1>{findCard?.title}</h1>
            <p>{findCard?.content}</p>
          </div>
        }
      </div>
      <hr />
      <h6>댓글</h6>
      <div>
        <textarea />
        <button>작성(미구현)</button>
      </div>
    </div>
  )
}

export default Detail