import React from "react";
import * as S from "../styles/Card.styled";
import { Goods } from "../types/goods.types";
import fullheart from "../assets/images/fullheart.svg";
import heart from "../assets/images/heart.svg";
import { useNavigate, useParams } from "react-router-dom";
import { usePostHeart } from "../queries/postHeart";
import { getTime } from "../utils/getTime";
import { useNumberWrite } from "../atom/number.atom";

interface CardProps {
    good: Goods;
}
export default function Card({ good }: CardProps) {
    const navigate = useNavigate();
    const numberWrite = useNumberWrite();
    const {
        mutateAsync: postHeart,
        isLoading = false,
        isError = false,
        error,
    } = usePostHeart();

    const handleHeart = (e: any) => {
        e.stopPropagation();

        const newHeartStatus = !good.heart;

        postHeart({
            productId: good.id,
            status: newHeartStatus,
        });
    };

    return (
        <S.Warp
            onClick={() => {
                numberWrite(good.id);
                navigate(`/goods`);
            }}
        >
            <S.Category>
                <div>
                    <p className="category">{`${good.category}`}</p>
                    <p className="place">
                        {good.sellingArea.split(" ").splice(0, 2).join(" ")}
                    </p>
                </div>
                <p className="count">
                    {`${good.sellCount}/${good.maxCount}`}명 참여
                </p>
            </S.Category>
            <S.Img>
                {good.mainImage && (
                    <img src={`https://moamoa.info${good.mainImage}`} alt="" />
                )}
            </S.Img>
            <S.Title>{good.title}</S.Title>
            <S.Bottom>
                <p>{`D-${getTime(good.finishedAt)}`}</p>
                <S.Button onClick={handleHeart}>
                    <img src={good.heart ? fullheart : heart} alt="" />
                </S.Button>
            </S.Bottom>
        </S.Warp>
    );
}
