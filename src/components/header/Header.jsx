import React from 'react'
import style from './header.module.css'

export default function Header() {

  return (
    <>
      <div className={style.headerWhole}>
        <div className={style.headerLeft}>
          <a href="/">
            <img className={style.headerLogo} src="./iconLogo.png" alt="로고" />
          </a>
        </div>
        <div className={style.headerRight}>
          <a className={style.headerToWebChat} href="">
            <span>채팅</span>
          </a>
          <a className={style.headerToWebAlarm} href="">
            <span>알림</span>
          </a>
          
          <a className={style.headerToWebMyPage} href="/mypage">
              <img className={style.headerToWebMyPageImg} src="./icon.png" alt="마이페이지" />
          </a>
          
          <button className={style.headerUploadBtn}>
            <a className={style.headerToWebUpload} href="/upload">
              <span>공동구매 모집</span>
            </a>
          </button>
        </div>

      </div>

      <nav className={style.headerNav}>
        <div className={style.headerNavLeft}>
          <a className='toMOAWebHome' href="/">
            <span>홈</span>
          </a>
          <a className='toMOAWebListPopular' href="/">
            <span>인기순</span>
          </a>
          <a className='toMOAWebHomeListDeadLine' href="/">
            <span>마감순</span>
          </a>
          <a className='toMOAWebHomeListLatest' href="/">
            <span>최신순</span>
          </a>
        </div>
        
        <div className={style.headerNavRight}>
          <input id="headerSearchKeyword" type="text"></input>
        </div>
      </nav>
      <hr></hr>
    </>
  )
}
