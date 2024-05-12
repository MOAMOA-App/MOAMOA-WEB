import styled from "styled-components";
import DatePicker from "react-datepicker";

interface CategoryBtnProps {
    selectedCategory: string;
    children: string;
}

export const Title = styled.input`
    border-bottom: 1px solid #d9d9d9;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    padding: 2px;
`;

export const Wrap = styled.form`
    display: flex;
    flex-direction: column;
    margin: 40px;
`;

export const ImgEmptyCont = styled.div`
    text-align: center;
    margin-bottom: 15px;
    ${"label"} {
        cursor: pointer;
    }
`;
export const ImgCont = styled.div`
    max-width: 320px;
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 5개의 동일한 크기의 열을 생성 */
    grid-template-rows: auto auto; /* 2개의 행, 각각의 크기는 자동 */
    gap: 14px 7px;
    margin: 0 auto;
    ${".full"} {
        position: relative;
        width: 313px;
        height: 313px;
        ${".mainImg"} {
            width: 313px;
            height: 313px;
            cursor: pointer;
            object-fit: cover;
        }
        /* width: 125px;
        height: 125px; */
        grid-column: 1 / -1;

        ${".delete"} {
            position: absolute;
            top: 0;
            right: 0;
            object-fit: none;
        }
    }
    ${"div"} {
        text-align: center; /* 텍스트 중앙 정렬 */
        ${"img"} {
            width: 65px;
            height: 64px;
            border-radius: 5px;
            cursor: pointer;
            object-fit: cover;
        }
    }
`;

export const Checklabel = styled.label`
    margin-bottom: 10px;
`;

export const ContentCont = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 100px auto;
    gap: 20px;
`;

export const Inp = styled.input`
    width: 216px;
    height: 35px;
    border: 1px solid #d9d9d9;
    margin-right: 5px;
    border-radius: 1550px;
    padding: 0 10px;
`;

export const InpCont = styled.div`
    display: flex;
    width: 340px;
    height: 35px;
    margin: 5px 0;
    border: 1px solid #d9d9d9;
    border-radius: 1550px;

    ${"button"} {
        color: #2c9b36;
        font-size: 14px;
        font-weight: 700;
        ${"img"} {
            vertical-align: middle;
        }
    }
`;

export const Inp2 = styled.input`
    width: 250px;
    border-radius: 1550px;
    padding: 0 5px;
`;

export const Wrap2 = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ${".second1"} {
        width: 318px;
        margin-right: 60px;
    }

    ${".second2"} {
        width: 300px;
        height: 230px;
        background: red;
        margin-bottom: 30px;
    }
    ${"div"} {
    }
    ${"input"}
    width: 316px;
    margin-right: 5px;
    margin: 6px 0;

    ${"label"} {
        font-weight: 700;
        font-size: 16px;
    }
    ${".radio"} {
        margin-bottom: 10px;
    }
`;

export const Check = styled.input`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid #f79331;
    border-radius: 50%;
    position: relative;
    top: 7px;
    margin-right: 5px;

    &:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: #f79331;
    }
`;
export const TextArea = styled.textarea`
    height: 150px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    margin: 10px 0 20px;
`;

export const CategoryCont = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const DateCont = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    ${"span"} {
        margin: 10px;
    }
`;

export const InpDateCont = styled.div`
    position: relative;
    ${".datePicker"} {
        width: 216px;
        height: 35px;
        margin: 5px 0;
        border: 1px solid #d9d9d9;
        padding: 10px;
        border-radius: 1550px;
    }
    ${"calenderWrapper"} {
        position: absolute;
    }
    ${"img"} {
        position: absolute;
        top: 11px;
        right: 22px;
    }
`;
export const DateInput = styled(DatePicker)``;

export const CategoryBtn = styled.div<CategoryBtnProps>`
    width: 55px;
    height: 29px;
    border-radius: 15px;
    font-weight: 500;
    font-size: 14px;
    margin: 0 7px 4px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    background-color: ${(props) =>
        props.selectedCategory === props.children ? "#F79331" : "#d9d9d9"};
    color: ${(props) =>
        props.selectedCategory === props.children ? "white" : "black"};
`;
export const BtnSave = styled.button`
    width: 100%;
    height: 40px;
    background: #d9d9d9;
    border-radius: 3px;

    font-weight: 700;
    font-size: 20px;
    line-height: 31px;
    /* identical to box height */

    text-align: center;

    color: #ffffff;
`;

export const CountBox = styled.div`
    display: flex;
    align-items: center;
`;
