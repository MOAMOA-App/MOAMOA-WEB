import { apiClient } from "../libary/reactQueryProvider";
import { ApiError, ApiResponse, MutationConfigOptions } from "../types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

interface FormData {
    oldPassword: string;
    newPassword: string;
    email: string;
}
interface RequestEmailResponse {
    product: number;
    status: boolean;
    message: string;
}

type Response = ApiResponse<RequestEmailResponse>;

const URL_PATH = `api/myinfo/password`;
const MUTATION_KEY = [URL_PATH];

export const putPassword = async (data: FormData) => {
    const res = await apiClient.post<FormData, AxiosResponse<Response>>(
        URL_PATH,
        data
    );

    return res.data;
};

export const usePutPassword = (configOptions?: MutationConfigOptions) => {
    const info = useMutation<Response, AxiosError<ApiError>, FormData, void>({
        mutationKey: MUTATION_KEY,
        mutationFn: (req) => putPassword(req),
        ...configOptions?.options,
        onSuccess: (res) => {},
        onSettled: () => {
            //   console.log("항상 실행");
        },
        onError: (error) => {},
    });

    return info;
};
