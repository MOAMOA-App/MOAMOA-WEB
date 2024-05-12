import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
    display: flex;
    position: fixed;
    background-color: white;
    width: 100vw;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    padding: 0 8%;
    height: 70px;
    /* margin-top: ; */
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
`;

export const MobileHeader = styled.div`
    display: flex;
    position: fixed;
    background-color: white;
    width: 100vw;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    padding: 0 25px;
    height: 70px;
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

export const LogoCont = styled(Link)`
    ${"img"} {
        max-width: 166px;
    }
`;

export const Wrap = styled.div`
    display: grid;
    grid-template-columns: min-content min-content min-content min-content;
    gap: 24px;
    align-items: center;
`;

export const Write = styled(Link)`
    width: 132px;
    height: 40px;
    display: flex;
    background: #f79331;
    border-radius: 3px;
    align-items: center;
    text-align: center;
    font-size: 13px;
    color: #ffffff;
    font-weight: 700;
    padding: 14px;
    align-items: flex-start;
    margin-right: 10px;

    ${"img"} {
        margin-right: 4px;
    }
`;

export const Icon = styled.img``;

export const Profile = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: black;
`;

export const Main = styled.main`
    padding-top: 110px;
    margin: 0 8%;
    @media (max-width: 768px) {
        margin: 0;

        /* flex-direction: column; */
        /* font-size: 12px; */
    }
`;
