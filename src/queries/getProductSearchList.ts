import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../libary/reactQueryProvider";
import { useQuery } from "@tanstack/react-query";
import { Goods } from "../types/goods.types";

type Product = {
    id: number;
    user: {
        id: number;
        nick: string;
        profImg: string | null;
        email: string;
        address: string | null;
        detailAddress: string | null;
    };
    category: string;
    sellingArea: string;
    detailArea: string;
    title: string;
    status: string;
    sellPrice: number;
    viewCount: number;
    description: string;
    sellCount: number;
    maxCount: number;
    choiceSend: string;
    createdAt: string;
    finishedAt: Date;
    productImages: string[];
};
type Response = any;
//수정하기!

const URL_PATH = `api/product`;

export const QUERY_KEY = [URL_PATH];
export const getProductSearchList = async (id: string = '') => {
    const res = await apiClient.get<Goods[], AxiosResponse<Response>>(`product?${id}`);
    return res.data.content;
};


export const useGetProductSearchList = (id: string = '') => {
    const info = useQuery<Response, AxiosError>({
        queryKey: [`${URL_PATH}?${id}`],  // Include order parameter in the query key
        queryFn: () => getProductSearchList(id),
        onError: (error: AxiosError) => {},
    });

    return info;
};
