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

interface Good {
    product: Goods;
    partylist: any;
}

type Response = any;
//수정하기!

// const URL_PATH = `product`;

// export const QUERY_KEY = [URL_PATH];

export const getPartyList = async (id: string) => {
    const res = await apiClient.get<Good, AxiosResponse<Response>>(`party`);
    return res.data;
};

export const useGetPartyList = (id: string) => {
    const announceListQueryKey = ["partyList", id];

    const info = useQuery<Response, AxiosError, Good>({
        queryKey: announceListQueryKey,
        queryFn: () => getPartyList(id),
        // select: (res) => res.data,

        onError: (error: AxiosError) => {
            // Handle error here. For example:
            // ... other error handling
        },
    });

    return info;
};
