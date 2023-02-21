import React from 'react'
import style from './myPageMain.module.css'
export const MyPageAlarmPart = (props) => {
    return (
        <div
            style={{
                display : "flex",
                height  : "74px",
                borderBottom : "1px solid lightgray",
                padding : "10px 0 "
            }}
        >
            <img 
                style={{
                width : "72px",
                height : "54px",
                marginRight : "15px",
                background : "lightgray",
                border : "1px solid lightgray",
                borderRadius : "15px"
                }}
            />
            <div
                style={{
                    flex : "1 0 auto"
                }}
            >
                <h3 className={style.alarmSubject}>사과 공동구매 합니다</h3>
                <input className={style.alarmText} type={"text"} value="내요오오오오오옹옹" readOnly/>
                <p className={style.alarmDate}>12일 전</p>
            </div>
            <button className={style.alarmButton}>삭제</button>
        </div>
)
}