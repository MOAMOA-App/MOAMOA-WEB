import deleteBtn from "../../assets/images/delete.svg";
import chat from "../../assets/images/chat_mobile.svg";

import React, { useState } from "react";

import styled from "styled-components";
import { useDeleteProduct } from "../../queries/deleteProduct";
import { usePostState } from "../../queries/postState";
import { useProductValue } from "../../atom/product.atom";
import { useGetPartyList } from "../../queries/getPartyList";
import { usePutParty } from "../../queries/putParty";
interface Props {
    checked: string;
}
export default function ProfileDetail({ pid }: any) {
    const order: string[] = ["참여자 관리", "게시글 수정"];
    const stateArr: string[] = ["거래 준비", "거래 진행", "거래 완료"];
    const [selectedOrder, setSelectedOrder] = useState<string>("참여자 관리");
    const handleCategoryClick = (item: string) => {
        setSelectedOrder(item);
    };

    const { data: good, isLoading: goodsLoading } = useGetPartyList(pid);
    const { mutateAsync: postState } = usePostState();
    const { mutateAsync: deleteProduct } = useDeleteProduct();
    const { mutateAsync: putParty } = usePutParty();

    const getStateText = (stateCode: any) => {
        switch (stateCode) {
            case "READY":
                return stateArr[0];
            case "IN_PROGRESS":
                return stateArr[1];
            case "COMPLETED":
                return stateArr[2];
            default:
                return "알 수 없음"; // 이 부분은 상태 코드가 알려지지 않았을 때의 기본값입니다.
        }
    };

    const handleDeleteProduct = () => {
        deleteProduct(pid);
        console.log(good);
    };

    const handleState = () => {
        postState({
            productId: Number(pid),
            status: "IN_PROGRESS",
        });
    };

    const handleClick = (id: number) => {
        putParty({
            product: Number(pid),
            pid: Number(id),
        });
    };

    return (
        <div>
            <div>
                {order.map((item) => (
                    <ToggleBtn
                        checked={selectedOrder}
                        onClick={() => {
                            handleCategoryClick(item);
                        }}
                    >
                        {item}
                    </ToggleBtn>
                ))}
            </div>
            <Wrap>
                <div>
                    <div>
                        <TitleCont>
                            <h4>{good?.product.title}</h4>
                            <button onClick={handleDeleteProduct}>
                                <img src={deleteBtn} alt="" />
                            </button>
                        </TitleCont>
                        <StateCont>
                            <div>
                                <State>거래 상태</State>
                                <State>
                                    {good
                                        ? getStateText(good?.product.status)
                                        : "로딩 중..."}

                                    <select>
                                        {stateArr.map((opt) => (
                                            <option value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </State>

                                <Btn onClick={handleState}>수정</Btn>
                                <State>모집현황</State>
                                <State>
                                    {good?.partylist.length}
                                    /10
                                </State>
                                <Btn>수정</Btn>
                            </div>
                            <InfoBtn>참여자 정보 엑셀화</InfoBtn>
                        </StateCont>
                    </div>
                </div>
                <div>
                    <Table>
                        <THead>
                            <tr>
                                <th>참여자</th>
                                <th>입금확인</th>
                                <th>구매개수</th>
                                <th>채팅</th>
                                <th>거래취소</th>
                            </tr>
                        </THead>
                        <TBody>
                            {good?.partylist.map((party: any) => (
                                <tr>
                                    <td>{party.buyer.nick}</td>
                                    <td>
                                        <Check
                                            type="checkbox"
                                            id="stay"
                                            checked={party.status}
                                            onChange={() =>
                                                handleClick(party.id)
                                            }
                                        />
                                    </td>
                                    <td>{party.count}개</td>
                                    <td>
                                        <button>
                                            <img src={chat} alt="" />
                                        </button>
                                    </td>
                                    <td>거래취소</td>
                                </tr>
                            ))}
                        </TBody>
                    </Table>
                </div>
            </Wrap>
        </div>
    );
}

export const ToggleBtn = styled.button<Props>`
    width: 118px;
    height: 34px;
    border-radius: 10px 10px 0px 0px;
    background: #d9d9d9;

    color: white;
    margin-top: 11px;

    background: ${(props) =>
        props.checked === props.children ? "#2c9b36" : "#d9d9d9"};
`;

export const InfoBtn = styled.button`
    width: 157px;
    height: 40px;
    border-radius: 3px;
    font-size: 14px;
    font-family: KoPubWorldDotum_Pro;
    font-weight: 700;
    color: white;
`;

export const Wrap = styled.div`
    width: 70%;
    height: 665px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    padding: 27px 21px 27px 20px;
`;

export const TitleCont = styled.div`
    ${"h4"} {
        font-size: 18px;
        font-family: KoPubWorldDotum_Pro;
        font-weight: 700;

        margin-bottom: 9px;
    }
    width: 915px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d9d9d9;
    /* margin: 21px 31px  */
`;

export const StateCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0 12px;
`;

export const State = styled.span`
    font-size: 14px;
    font-family: KoPubWorldDotum_Pro;

    margin-right: 8px;
`;

export const Btn = styled.button`
    width: 46px;
    height: 22px;
    border-radius: 15px;
    background: #f79331;
    color: white;
    margin-right: 22px;
    text-align: center;
    font-size: 14px;
    font-family: KoPubWorldDotum_Pro;
    font-weight: 700;
`;

export const THead = styled.thead`
    /* width: 900px; */
    height: 41px;
    background: #2c9b36;
    ${"th"} {
        padding: 10px;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
    }
    color: white;
    /* } */
`;

export const Table = styled.table`
    width: 900px;
`;

export const TBody = styled.tbody`
    width: 900px;

    ${"td"} {
        height: 64px;
        color: #5c5c5c;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        border-bottom: 1px solid #d9d9d9;
    }

    ${"img"} {
    }
`;

export const Label = styled.label`
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #8f8f8f;
`;

export const Check = styled.input`
    appearance: none;
    width: 30px;
    height: 30px;
    border: 1px solid #2c9b36;
    border-radius: 50%;
    position: relative;
    margin-right: 5px;
    vertical-align: middle;

    cursor: pointer;
    &:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: #2c9b36;
    }
`;
