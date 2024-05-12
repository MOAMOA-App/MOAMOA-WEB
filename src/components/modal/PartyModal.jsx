import React, { useEffect, useRef } from "react";
import arrowLeft from "../../assets/images/arrow_left_mini.svg";
import arrowRight from "../../assets/images/arrow_right_mini.svg";
import money from "../../assets/images/money.png";

import * as S from "../../styles/PartyModal.styled";
import list from "../../data/alarm.json";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostParty } from "../../queries/postParty";
import { getUserInfo } from "../../utils/localStorage";

export default function PartyModal({
    data,
    modalOpen,
    setModalOpen,
    handleModal,
}) {
    // 모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    // 모달 외부 클릭시 끄기 처리
    // Modal 창을 useRef로 취득
    const modalRef = useRef();
    const {
        mutateAsync: postParty,
        isLoading = false,
        isError = false,
        error,
    } = usePostParty();

    const { id } = getUserInfo();

    const { register, handleSubmit, watch, reset, setValue } = useForm({
        defaultValues: {
            count: 1, // Set the initial count value
        },
    });

    const count = watch("count"); // This will watch the input value and re-render the component whenever it changes

    // Increase count value
    const increaseCount = () => {
        setValue("count", parseInt(count, 10) + 1);
    };

    // Decrease count value
    const decreaseCount = () => {
        setValue("count", Math.max(parseInt(count, 10) - 1, 1)); // Prevent count from being less than 1
    };

    const onSubmit = (content) => {
        let resData = {
            product: data.id,
            count: Number(content.count),
            buyer: Number(id),
            address: content.address,
        };

        let res = postParty(resData);
        setModalOpen(false);
    };

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };

        // 이벤트 핸들러 등록
        document.addEventListener("mousedown", handler);
        // document.addEventListener('touchstart', handler); // 모바일 대응

        return () => {
            // 이벤트 핸들러 해제
            document.removeEventListener("mousedown", handler);
            // document.removeEventListener('touchstart', handler); // 모바일 대응
        };
    });

    return (
        <S.Back>
            <S.Wrap ref={modalRef} onSubmit={handleSubmit(onSubmit)}>
                <S.Title>제목: {data.title}</S.Title>
                <S.Count>
                    현재 잔여개수 <span>{`${data.sellCount}`}</span>/
                    {`${data.maxCount}`} 중 <br />
                    <button type="button" onClick={decreaseCount}>
                        <img src={arrowLeft} alt="Decrease" />
                    </button>
                    <input type="number" {...register("count")} />
                    <button type="button" onClick={increaseCount}>
                        <img src={arrowRight} alt="Increase" />
                    </button>
                    <label htmlFor="">개 구매할게요</label>
                </S.Count>
                <S.PriceCont>
                    <img src={money} alt="" />
                    {data.sellPrice * parseInt(count || 0)}원
                </S.PriceCont>
                {/* {data.choiceSend === "택배" && (
                    <>
                        <div>주소를 입력하세요</div>
                        <input type="string" {...register("address")} />
                    </>
                )} */}
                <S.BtnCont>
                    <button type="button" onClick={closeModal}>
                        취소
                    </button>
                    <button>참여하기</button>
                </S.BtnCont>
            </S.Wrap>
        </S.Back>
    );
}
