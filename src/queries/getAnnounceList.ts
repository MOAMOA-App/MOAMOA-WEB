import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { apiClient } from "../libary/reactQueryProvider";
import { ApiResponse, QueryConfigOptions } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken, removeAccessToken } from "../utils/localStorage";
import { Goods, Goods2 } from "../types/goods.types";

type Product = {
    id: number;
    lock: boolean;
    contents: string;
    createdAt: string;
    updatedAt: string;
};
type Response = any;
//수정하기!

const URL_PATH = `product`;

export const QUERY_KEY = [URL_PATH];
const accessToken = getAccessToken();

export const getAnnounceList = async (id: string) => {
    const res = await apiClient.get<Product[], AxiosResponse<Response>>(
        `${URL_PATH}/${id}/announce`
    );
    return res.data;
};

export const useGetAnnounceList = (id: string) => {
    const announceListQueryKey = ['announceList', id]; 

    const info = useQuery<Response, AxiosError, Product[]>({
        queryKey: announceListQueryKey,
        queryFn: () => getAnnounceList(id),
        // select: (res) => res.data,

        onError: (error: AxiosError) => {
            // Handle error here. For example:
            // ... other error handling
        },
    });

    return info;
};
