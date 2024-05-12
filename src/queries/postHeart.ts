import { apiClient } from "../libary/reactQueryProvider";
import { ApiError, ApiResponse, MutationConfigOptions } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { QUERY_KEY } from "./getProductList";

interface Request {
    productId: number;
    status: boolean;
}

interface LoginResponse {
    productId?: number;
    status?: boolean;
    message?: string;
}

type Response = ApiResponse<LoginResponse>;

const URL_PATH = `api/product/heart`;
const MUTATION_KEY = [URL_PATH];

export const postHeart = async (data: Request) => {
    const res = await apiClient.post<Request, AxiosResponse<Response>>(
        URL_PATH,
        data
    );

    return res.data;
};
export const usePostHeart = (configOptions?: MutationConfigOptions) => {
    const queryClient = useQueryClient(); // Get the queryClient instance

    const info = useMutation<Response, AxiosError<ApiError>, Request, void>({
        mutationKey: MUTATION_KEY,
        mutationFn: (req) => postHeart(req),
        ...configOptions?.options,
        onSuccess: (res) => {
            // Invalidate and refetch
            if (res.message !== "OK") {
                alert("본인 게시글은 찜할 수 없습니다.");
            }
            queryClient.invalidateQueries(QUERY_KEY);
        },
        onError: (error) => {
            // Handle error
        },
        onSettled: () => {
            // Optionally refetch queries after mutation
            queryClient.invalidateQueries(QUERY_KEY);
        },
    });

    return info;
};
