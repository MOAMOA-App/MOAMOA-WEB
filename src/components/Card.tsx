import React from "react";
import * as S from "../style/Card.styled";
import { Goods } from "../types/goods.types";

interface CardProps {
    good: Goods;
}
export default function Card({ good }: CardProps) {
    return (
        <S.Warp>
            <S.Category>
                <div>
                    <p className="category">{`${good.categoryId}`}</p>
                    <p className="place">{good.sellingArea}</p>
                </div>
                <p className="count">{`${good.maxCount}/${good.maxCount}`}명 참여</p>
            </S.Category>
            <S.Img>d</S.Img>
            <S.Title>{good.title}</S.Title>
            <S.Bottom>
                <p>{`D-${good.finishedAt}`}</p>
                <S.Button>하트</S.Button>
            </S.Bottom>
        </S.Warp>
    );
}
