import {
    atom,
    useRecoilValue,
    useRecoilState,
    useSetRecoilState,
} from "recoil";

export interface ProductType {
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

const productState = atom<ProductType>({
    key: "productState",
    default: {
        category: "",
        sellingArea: "", //판매위치
        detailArea: "", //판매위치 상세
        title: "",
        sellPrice: 0,
        description: "",
        finishedAt: "",
        maxCount: 0,
        choiceSend: "", //전달 방법
        status: "",
    },
});

export const useProductState = () => useRecoilState(productState);
export const useProductValue = () => useRecoilValue(productState);
export const useProductWrite = () => useSetRecoilState(productState);
