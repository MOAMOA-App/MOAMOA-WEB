import { apiClient } from "../libary/reactQueryProvider";
import { ApiError, ApiResponse, MutationConfigOptions } from "../types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
    setAccessToken,
    setRefreshToken,
    setUserInfo,
} from "../utils/localStorage";

interface Request {
    email: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    accessTokenExpiresIn: number;
    grantType: string;
    refereshToken: string;
}

type Response = ApiResponse<LoginResponse>;

const URL_PATH = `api/user/login`;
const MUTATION_KEY = [URL_PATH];

export const postLogin = async (data: Request) => {
    const res = await apiClient.post<Request, AxiosResponse<Response>>(
        URL_PATH,
        data
    );

    return res.data;
};

export const usePostLogin = (configOptions?: MutationConfigOptions) => {
    const info = useMutation<Response, AxiosError<ApiError>, Request, void>({
        mutationKey: MUTATION_KEY,
        mutationFn: (req) => postLogin(req),
        ...configOptions?.options,
        onSuccess: (res) => {
            console.log(res);

            if (res) {
                setAccessToken(res.accessToken);
                setRefreshToken(res.refreshToken);
                setUserInfo(res.user);
            }
        },
        onSettled: () => {
            //   console.log("항상 실행");
        },
        onError: (error) => {},
    });

    return info;
};
