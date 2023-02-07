import React from 'react'
import MyPageMenu from '../../components/myPageMenu/MyPageMenu'
import MyPageProfileInfo from '../../components/myPageProfileInfo/MyPageProfileInfo'
import MyPageMain from '../../components/myPageMain/MyPageMain'
import style from './myPage.module.css'
import { Outlet } from 'react-router-dom'


export default function Mypage() {
    return (
        <>
            <MyPageProfileInfo/>
            <div
                style={{
                    minHeight : "700px",
                    display : "flex"
                }}
            >
                <MyPageMenu/>
                <MyPageMain/>
            </div>
        </>
    )
}


