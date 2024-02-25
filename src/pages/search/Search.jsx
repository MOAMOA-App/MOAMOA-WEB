import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Card from "../../components/Card";
import { SearchBar } from "../../styles/SearchBar";
import search from "../../assets/images/search_orange.svg";
import ham from "../../assets/images/햄버거.svg";
import goods from "../../data/goods.json";
import { useCategoryValue } from "../../atom/category.atom";
import CardMobile from "../../components/CardMobile";
import { useGetProductSearchList } from "../../queries/getProductSearchList";

export default function Search() {
    const [menus, setMenu] = useState([
        { title: "제목", key: "sub", checked: false },
        { title: "내용", key: "descript", checked: false },
        { title: "제목+내용", key: "subdesc", checked: true },
    ]);
    const category = useCategoryValue();
    const [inputValue, setInputValue] = useState("");
    const [keyword, setKeyword] = useState("");
    const [checkedCategories, setCheckedCategories] = useState({
        전체: false,
        생활: false,
        의류: false,
        식품: false,
        가전: false,
        취미: false,
        운동: false,
        굿즈: false,
        동물: false,
        해외: false,
        기타: false,
    });
    const order = ["최신순", "인기순", "마감임박순"];
    const [selectedState, setSelectedState] = useState({
        모집중: true,
        진행중: true,
        거래완료: true,
    });

    const [selectedOrder, setSelectedOrder] = useState("최신순");
    const arr = [1, 2, 34, 5, 676, 878, 768];
    useEffect(() => {
        if (category in checkedCategories) {
            // category가 checkedCategories의 키인지 확인
            setCheckedCategories((prev) => ({
                ...prev, // 이전 상태 복사
                [category]: true, // category 키의 값을 true로 변경
            }));
        }
    }, [category]); // category 값이 변경될 때마다 effect 실행
    const handleMenuClick = (index) => {
        setMenu((prevMenu) => {
            const newMenu = [...prevMenu];
            newMenu[index].checked = !newMenu[index].checked;
            console.log(newMenu);
            return newMenu;
        });
    };
    const handleCheckboxChange = (category) => {
        if (category === "전체") {
            setCheckedCategories({
                전체: true,
                생활: false,
                의류: false,
                식품: false,
                가전: false,
                취미: false,
                운동: false,
                굿즈: false,
                동물: false,
                해외: false,
                기타: false,
            });
        } else {
            setCheckedCategories((prev) => ({
                ...prev,
                전체: false, // 다른 카테고리가 선택되면 "전체"를 false로 설정합니다.
                [category]: !prev[category],
            }));
        }
    };
    const handleCategoryClick = (order) => {
        setSelectedOrder(order);
    };

    const handleStateClick = (order) => {
        setSelectedState((prev) => ({
            ...prev,
            [order]: !prev[order],
        }));
    };

    const [selected, setSelected] = useState("인기순");

    const handleChange = (event) => {
        setSelected(event.target.value);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const orderMappings = {
        최신순: "recent",
        오래된순: "oldest",
        마감순: "imminent",
    };
    const mappedOrder = orderMappings[selectedOrder];

    const handleSearchBtn = (event) => {
        // Log the current state of checkedCategories, selectedState, and selectedOrder
        const selectedCategoryIndices = Object.entries(checkedCategories)
            .map(([category, isChecked], index) => (isChecked ? index : -1))
            .filter((index) => index !== -1)
            .join(",");
        const selectedCategories = Object.entries(checkedCategories)
            .filter(([category, isChecked]) => isChecked)
            .map(([category]) => category)
            .join(",");
        const selectedSearchCriteria = menus.find((menu) => menu.checked)?.key;

        const selectedStates = Object.entries(selectedState)
            .filter(([state, isSelected]) => isSelected)
            .map(([state]) => state)
            .join(",");
        let dkeyword =
            "keyword=" +
            inputValue +
            // "&state=" +
            // selectedStates +
            "&category=" +
            selectedCategoryIndices +
            "&order=" +
            mappedOrder +
            "&search=" +
            selectedSearchCriteria;

        setKeyword(dkeyword);
        //                 검색 기준(search) : sub |  descript | subdesc

        // 정렬 기준(order) :

        // 진행 상태
    };
    useEffect(() => {}, [keyword]);
    const { data } = useGetProductSearchList(keyword);
    console.log(data);
    return (
        <>
            <Wrapper>
                <div>
                    <Cont>
                        <WrapSearch>
                            <img className="ham" src={ham} alt="" />
                            <SearchBar>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="검색어를 입력해주세요."
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                <button onClick={handleSearchBtn}>
                                    <img src={search} alt="검색버튼" />
                                </button>
                            </SearchBar>
                        </WrapSearch>
                    </Cont>
                    <Wrap>
                        <Li>
                            <span>검색기준</span>
                            <div>
                                {
                                    menus.map((menu, index) => (
                                        <Btn
                                            checked={menu.checked}
                                            title={menu.title}
                                            key={index}
                                            onClick={() =>
                                                handleMenuClick(index)
                                            }
                                        >
                                            {menu.title}
                                        </Btn>
                                    ))
                                }
                            </div>
                        </Li>
                        <Li>
                            <span>카테고리</span>
                            <div>
                                {Object.keys(checkedCategories).map(
                                    (category) => (
                                        <Btn
                                            checked={
                                                checkedCategories[category]
                                            }
                                            key={category}
                                            onClick={() =>
                                                handleCheckboxChange(category)
                                            }
                                        >
                                            {category}
                                        </Btn>
                                    )
                                )}
                            </div>
                        </Li>
                        <Li>
                            <span>진행상태</span>
                            <div>
                                {Object.keys(selectedState).map((category) => (
                                    <Btn
                                        checked={selectedState[category]}
                                        key={category}
                                        onClick={() =>
                                            handleStateClick(category)
                                        }
                                    >
                                        {category}
                                    </Btn>
                                ))}
                            </div>
                        </Li>
                        <Li>
                            <span>정렬기준</span>
                            <div>
                                {order.map((category) => (
                                    <Label
                                        checked={selectedOrder}
                                        onClick={() =>
                                            handleCategoryClick(category)
                                        }
                                    >
                                        {category}
                                    </Label>
                                ))}
                            </div>
                        </Li>
                    </Wrap>
                </div>
                <Div>
                    <>
                        {data&& data.map((good) => (
                                <Card good={good} />
                            ))}
                    </>
                </Div>
            </Wrapper>

            <MobileWrapper>
                <SearchBar>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="검색어를 입력해주세요."
                    />
                    <button onClick={handleSearchBtn}>
                        <img src={search} alt="검색버튼" />
                    </button>
                </SearchBar>

                <div>
                    {goods.goods.map((good) => (
                        <CardMobile good={good}></CardMobile>
                    ))}
                </div>
            </MobileWrapper>
        </>
    );
}

export const Wrapper = styled.div`
    @media screen and (max-width: 768px) {
        display: none;
    }
`;
export const MobileWrapper = styled.div`
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

export const Cont = styled.div`
    display: flex;
    background: white;
    flex-direction: column;
    align-items: center;
    /* opacity:0.5; */
`;

export const WrapSearch = styled.div`
    display: flex;

    /* position: fixed; */
    z-index: 99;

    background-color: rgba(255, 255, 255);
    backdrop-filter: blur(2px);
    /* opacity: 1; */
    width: 70%;
    ${".ham"} {
        position: absolute;
        top: 7px;
        z-index: 2;
        opacity: 1;
    }
`;

//   .slide-top {
// -webkit-animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
// }

export const Wrap = styled.div`
    width: 70%;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    z-index: 999;
    opacity: 1;
    margin: 0 auto 15px;
`;

export const Div = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
    gap: 20px 20px;
    /* padding: 10px ; */
    @media (max-width: 768px) {
        padding: 26px 10%;
        margin: 0 -40px 40px;
        padding: 10px 40px;
    }
`;

export const Li = styled.li`
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 73px 1fr;
    margin: 19px 31px;
    color: #5c5c5c;
    font-family: KoPubWorldDotum_Pro;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    ${"span"} {
        margin-right: 23px;
    }
`;

export const Btn = styled.button`
    min-width: 42px;
    height: 22px;
    border-radius: 15px;
    background: #ff952c;
    color: #fff;
    text-align: center;
    font-family: KoPubWorldDotum_Pro;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-right: 10px;
    padding: 0 5px;
    background: ${({ checked }) => (checked ? "#FF952C" : "#D9D9D9")};
`;
export const Label = styled.button`
    min-width: 42px;
    height: 22px;
    padding: 0 5px;
    border-radius: 15px;
    background: #ff952c;
    color: #fff;
    text-align: center;
    font-family: KoPubWorldDotum_Pro;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-right: 10px;
    background-color: ${(props) =>
        props.checked === props.children ? "#F79331" : "#d9d9d9"};
    color: ${(props) => (props.checked === props.children ? "white" : "white")};
`;
