import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import goods from "../../data/goods.json";
import search from "../assets/images/search_orange.svg";
import Category from "../../components/Category";
import HomeTitle from "../../components/HomeTitle";
import * as S from "../../styles/Home.styled";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetProductList } from "../../queries/getProductList";
import { Goods } from "@/types/goods.types";
import { useGetProductSearchList } from "../../queries/getProductSearchList";

export default function Home() {
    const navigate = useNavigate();
    const [isLoadingAll, setIsLoadingAll] = useState(true);
    const { data: productListQuery1, isLoading: isLoading1 } = useGetProductSearchList('recent');
    const { data: productListQuery2, isLoading: isLoading2 } = useGetProductSearchList('oldest');
    const { data: productListQuery3, isLoading: isLoading3 } = useGetProductSearchList('imminent');

    useEffect(() => {
        setIsLoadingAll(isLoading1 || isLoading2 || isLoading3);
    }, [isLoading1, isLoading2, isLoading3]);

    useEffect(() => {
        console.log(productListQuery1);
    }, []);

    const titleArr = [
        ["마감임박", "마감이 가까워요", productListQuery1],
        ["인기순", "사용자들이 선호하는 상품", productListQuery2],
        ["최신순", "What’s new?", productListQuery3],
    ];


    return (
        <S.Wrap>
            <Category />
            {isLoadingAll ? (
                <div>Loading...</div>
            ) : (
                titleArr.map(([title, description, productListQuery])=> (
                    <S.RowCont>
                        <HomeTitle title={title} description={description}/>
                        <S.ContCard>
                            {productListQuery
                                .slice(0, 5)
                                .map((good: Goods) => (
                                    <div key={good.id}>
                                        <Card good={good}></Card>
                                    </div>
                                ))}
                        </S.ContCard>
                    </S.RowCont>
                ))
            )}
        </S.Wrap>
    );
}
