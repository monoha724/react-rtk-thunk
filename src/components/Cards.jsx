import React, { useEffect } from 'react'
import '../style.css'
import { useDispatch, useSelector } from 'react-redux'
import { __getCards } from '../rtk/modules/module';
import { useNavigate } from 'react-router-dom';

function Cards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cards = useSelector((state) => state.cards.cards);

  useEffect(()=>{
    dispatch(__getCards());
  }, []);

  return (
    <div className='cards-wrapper'>
      {cards?.map((item) => 
        <div className='card' key={item.id}>
          <img src={item?.img} alt="" onClick={()=>{navigate(`/detail/${item?.id}`)}}/>
          <span>{item?.title}</span>
        </div>
      )}
    </div>
  )
}

export default Cards