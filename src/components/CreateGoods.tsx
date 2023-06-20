import React from 'react'
import styled from 'styled-components';
import Card from "./Card.tsx";

export default function CreateGoods() {
  const arr=[1,2,3,4,5,6]
    return (
    <Wrap>
        <h2>생성한 공동구매</h2>
        <label htmlFor="search"> 조회
            <Search id="search" type="text" />
        </label>
        <Div>
            <>
                {arr.map((arr)=> <Card/>)}
            </>

        </Div>

    </Wrap>
  )
}


export const Wrap = styled.div`
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    padding: 28px 32px;
`;
export const Div = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    flex-wrap: wrap;
    /* width:100vw; */
    margin:10 auto 20px;
    gap: 20px;
    padding: 10px ;
    @media (max-width: 768px) {
        padding: 26px 10% ;
        margin:0 -40px 40px;
        padding: 10px 40px;

  }
`;
export const Search = styled.input`
    width: 420px;
    height: 33px;
    border: 1px solid #D9D9D9;
    border-radius: 25px;
`;