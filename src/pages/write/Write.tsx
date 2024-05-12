import React, { useRef, useState, useEffect } from "react";
import imgBtn from "../../assets/images/imgBtn.png";
import hright from "../../assets/images/hright.svg";
import hleft from "../../assets/images/hleft.svg";
import searchGreen from "../../assets/images/search_green.svg";
import calendar from "../../assets/images/calendar.svg";
import deleteBtn from "../../assets/images/deleteBtn.svg";
import checked from "../assets/images/checked.svg";
import defaultChecked from "../assets/images/defaultChecked.svg";
import ModalPortal from "../../components/modal/ModalPortal";
import MapModal from "../../components/modal/MapModal";
import useCustomModal from "../../hooks/useCustomModal";
import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as S from "../../styles/Write.styled";
import { SubmitHandler, useForm } from "react-hook-form";
import KakaoMapScript from "../../hooks/KakaoMapScript";
import MapContainer from "../../hooks/KakaoMapScript";
import { usePostProduct } from "../../queries/postProduct";
import { usePostImage } from "../../queries/postImage";
interface FormValue {
    title: string;
    description: string;
    sellPrice: number;
    userId: string;
    category: string;
    sellingArea: string;
    detailArea: string;
    status: string;
    finishedAt: string; //수정
    maxCount: number;
}

export interface Request {
    category: string;
    sellingArea: string; //판매위치
    detailArea: string; //판매위치 상세
    title: string;
    sellPrice: number;
    description: string;
    finishedAt: any;
    maxCount: number;
    choiceSend: string; //전달 방법
    status: string;
    // longtitue: string;
    // lattitue: string;
}

type WriteProps = {
    name: string;
    mark: string;
    arr: string;
    optional?: string;
    onClick: (name: string) => void; //함수타입을 가져오고 싶을때
};

function Write() {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [modalState, setModalState] = useState(false);
    const [inputAddressValue, setInputAddressValue] = useState<string>("");
    const [inputZipCodeValue, setInputZipCodeValue] = useState<string>("");
    const [imgFile, setImgFile] = useState<any>(null);
    const [imgFiles, setImgFiles] = useState<string[]>([]);

    const arr = [
        "생활",
        "의류",
        "식품",
        "가전",
        "취미",
        "운동",
        "굿즈",
        "동물",
        "해외",
        "기타",
    ];
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const { modalOpen, setModalOpen } = useCustomModal();
    const [coordinates, setCoordinates] = useState({ x: "", y: "" });
    const [selectedImage, setSelectedImage] = useState<string>("");

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };
    const {
        mutateAsync: postProduct,
        isLoading = false,
        isError = false,
        error,
    } = usePostProduct();

    const {
        mutateAsync: postImage,
        // isLoading = false,
        // isError = false,
        // error,
    } = usePostImage();

    // 모달창 노출
    const showModal = (e: any) => {
        setModalOpen(true);
    };
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleReceiveCoordinates = (x: string, y: string) => {
        console.log(`Coordinates: ${x}, ${y}`);
        setCoordinates({ x, y });
        // 필요한 로직을 여기에 추가합니다. 예를 들면 상태 설정 등
    };

    useEffect(() => {
        setModalOpen(false);
    }, [inputAddressValue, setModalOpen]);

    const { register, handleSubmit, watch, reset, setValue } =
        useForm<Request>();

    const upload = useRef<HTMLInputElement>(null);

    // 이미지 업로드 input의 onChange

    const saveImgFile = () => {
        const file = upload.current?.files?.[0]; // optional chaining을 사용

        if (!file) {
            // 파일이 없으면 함수를 종료
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
            console.log(reader.result);
        };
    };
    const saveImgFiles = () => {
        const files = upload.current?.files;

        if (!files || files.length === 0) {
            // 파일이 없으면 함수를 종료
            return;
        }

        const imageFiles = Array.from(files); // 파일 객체들을 배열로 변환

        imageFiles.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                // 이미지 파일의 데이터 URL을 상태 배열에 추가
                setImgFiles((prev) => [...prev, reader.result as string]);
            };
        });
    };
    const handleImageClick = (imgUrl: string) => {
        setSelectedImage(imgUrl); // 선택된 이미지의 URL을 상태로 저장
    };
    const handleImageDelete = () => {
        console.log(imgFiles);

        // 선택된 이미지를 제거
        setImgFiles(imgFiles.filter((img) => img !== selectedImage));
        setSelectedImage(imgFiles[0]); // 선택된 이미지의 URL을 상태로 저장

        // 현재 선택된 이미지가 삭제되면, 선택된 이미지를 초기화
        if (imgFiles.length === 1) {
            setImgFiles([]);
        }
    };
    const onSubmit: SubmitHandler<Request> = async (data) => {
        console.log(inputAddressValue);
        console.log(inputZipCodeValue);

        let resData: Request = {
            detailArea: data.detailArea,
            title: data.title,
            status: "READY",
            sellPrice: Number(data.sellPrice),
            description: data.description,
            finishedAt: "24-08-10 12:00",
            maxCount: Number(data.maxCount),
            choiceSend: "택배",
            category: selectedCategory,
            sellingArea: inputAddressValue,
        };

        let res = await postProduct(resData);
        navigate("/");
        postImage({
            idx: res.id,
            category: "product",
            images: imgFiles,
        });
    };

    return (
        <S.Wrap onSubmit={handleSubmit(onSubmit)}>
            <div>
                {imgFiles[0] ? (
                    <S.ImgCont>
                        <div className="full">
                            <img
                                className="mainImg"
                                src={selectedImage || imgFiles[0]}
                                alt="이미지"
                            />
                            <img
                                className="delete"
                                src={deleteBtn}
                                alt=""
                                onClick={() => handleImageDelete()}
                            />
                        </div>
                        {imgFiles.map((img, index) => (
                            <div>
                                <img
                                    key={index}
                                    src={img}
                                    alt={`uploaded-img-${index}`}
                                    onClick={() => handleImageClick(img)}
                                />
                            </div>
                        ))}
                    </S.ImgCont>
                ) : (
                    <S.ImgEmptyCont>
                        <label htmlFor="file-uploader">
                            <img src={imgBtn} alt="" />
                            <p>이미지 등록하기</p>
                        </label>
                        <input
                            id="file-uploader"
                            type="file"
                            accept="image/*"
                            multiple
                            ref={upload}
                            onChange={saveImgFiles}
                            // style={{ display: "none" }}
                        />
                    </S.ImgEmptyCont>
                )}
            </div>
            <S.ContentCont>
                <label htmlFor="scales">제목</label>
                <S.Title
                    type="name"
                    id="scales"
                    placeholder="제목을 입력하세요"
                    required
                    {...register("title")}
                />
                <label>카테고리</label>
                <S.CategoryCont>
                    {arr.map((category) => (
                        <S.CategoryBtn
                            selectedCategory={selectedCategory}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </S.CategoryBtn>
                    ))}
                </S.CategoryCont>
                <label htmlFor="">모집기간</label>
                <S.DateCont>
                    <S.InpDateCont>
                        {/* <DatePicker
                            className="datePicker"
                            dateFormat="yyyy.MM.dd" // 날짜 형태
                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                            minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
                            maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        /> */}
                        <img src={calendar} alt="" />
                    </S.InpDateCont>
                    <span>~</span>
                    <S.InpDateCont>
                        {/* <DatePicker
                            className="datePicker"
                            calendarClassName="calenderWrapper"
                            dateFormat="yyyy.MM.dd" // 날짜 형태
                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                            minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
                            maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        /> */}
                        <img src={calendar} alt="" />
                    </S.InpDateCont>
                </S.DateCont>
                <label htmlFor="scales">상품가격</label>
                <div>
                    <S.Inp
                        type="number"
                        id="scales"
                        required
                        {...register("sellPrice")}
                    />
                    원
                </div>
                <label htmlFor="scales">모집개수</label>

                <S.CountBox>
                    <S.Inp
                        type="number"
                        id="scales"
                        required
                        {...register("maxCount")}
                    />
                    개
                    <S.Checklabel htmlFor="scales">
                        <S.Check type="checkbox" id="scales" name="scales" />
                        개수 제한 없음
                    </S.Checklabel>
                </S.CountBox>
            </S.ContentCont>
            <label htmlFor="scales">상세정보 및 내용</label>
            <S.TextArea
                placeholder="게시글 입력하기"
                required
                {...register("description")}
            />
            <S.Wrap2>
                <div className="second1">
                    <label htmlFor="scales">주소입력</label>
                    <div className="radio">
                        <label htmlFor="offline">
                            <S.Check
                                type="checkbox"
                                id="offline"
                                name="offline"
                            />
                            직거래
                        </label>
                        <label htmlFor="online">
                            <S.Check
                                type="checkbox"
                                id="online"
                                name="online"
                            />
                            온라인
                        </label>
                    </div>

                    <label htmlFor="scales">주소찾기</label>
                    <S.InpCont>
                        <S.Inp2
                            type="name"
                            id="scales"
                            required
                            value={inputAddressValue}
                            {...register("sellingArea")}
                        />
                        <button onClick={showModal} type="button">
                            주소찾기
                            <img src={searchGreen} alt="" />
                        </button>
                    </S.InpCont>

                    <label htmlFor="scales"></label>
                    <S.InpCont>
                        <S.Inp2
                            type="name"
                            id="scales"
                            placeholder="상세주소를 입력해주세요"
                            {...register("detailArea")}
                        />
                    </S.InpCont>
                </div>
                <MapContainer
                    inputAddressValue={inputAddressValue}
                    onReceiveCoordinates={handleReceiveCoordinates}
                />
                {/* <div
                    className="second2"
                    id="myMap"
                    style={{ width: "440px", height: "230px" }}
                ></div> */}
                {/* {optional && <p>{optional}</p>} */}
            </S.Wrap2>
            <div>
                <S.BtnSave>등록하기</S.BtnSave>
            </div>
            {modalOpen && (
                <ModalPortal>
                    <MapModal
                        type="product"
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        handleModal={showModal}
                        setInputAddressValue={setInputAddressValue}
                        setInputZipCodeValue={setInputZipCodeValue}
                        // handleModal={handleProductDetail}
                    />
                </ModalPortal>
            )}
        </S.Wrap>
    );
}

Write.defaultProps = {
    mark: "!",
};

export default Write;
