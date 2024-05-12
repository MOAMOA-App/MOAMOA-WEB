import React from "react";
import styled from "styled-components";
import arrow from "../assets/images/arrow_right.svg";

type TitleProps = {
    title: string;
    description: string;
};

export default function HomeTitle({ title, description }: TitleProps) {
    return (
        <Wrap>
            <p className="ment">{description}</p>
            <Cont>
                <p className="tit">{title}</p>
                <button type="button">
                    <p>전체보기 </p>
                    <img src={arrow} alt="" />
                </button>
            </Cont>
        </Wrap>
    );
}

export const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 7px;
    line-height: 22px;
    margin: 19px 0px 19px 0px;
    border-left: #2c9b36 solid 10px;
    ${".ment"} {
        font-weight: 500;
        font-size: 14px;
        color: #8f8f8f;
    }
    ${".tit"} {
        font-weight: 700;
        font-size: 24px;
        color: #2c9b36;
    }
`;

export const Cont = styled.div`
    display: flex;
    justify-content: space-between;

    ${"button"} {
        color: #2c9b36;
        font-weight: 700;
        font-size: 14px;
        display: flex;
        align-items: center;
    }
`;
