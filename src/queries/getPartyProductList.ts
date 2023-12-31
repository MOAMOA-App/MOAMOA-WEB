import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { apiClient } from "../libary/reactQueryProvider";
import { ApiResponse, QueryConfigOptions } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken, removeAccessToken } from "../utils/localStorage";
import { Goods, Goods2 } from "../types/goods.types";




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

const URL_PATH = `myinfo/party`;

export const QUERY_KEY = [URL_PATH];
const accessToken = getAccessToken();

export const getPartyProductList = async (config?: AxiosRequestConfig) => {
    const res = await apiClient.get<Goods[], AxiosResponse<Response>>(
        URL_PATH,
        {
            ...config,
            params: {
                ...config?.params,
            },
        }
    );
    return res.data.content;
};

export const useGetPartyProductList = (configOptions?: QueryConfigOptions) => {
    const info = useQuery<Response, AxiosError, Goods[]>({
        queryKey: QUERY_KEY,
        queryFn: () => getPartyProductList(configOptions?.config),
        ...configOptions?.options,
        // select: (res) => res.data,
        enabled: !!accessToken, // uncomment this if you want the query to run only when accessToken is available

        onError: (error: AxiosError) => {
            // Handle error here. For example:
            if (error.response?.status === 401) {
                removeAccessToken(); // or any other action appropriate for auth failures
            }
            // ... other error handling
        },
    });

    return info;
};
