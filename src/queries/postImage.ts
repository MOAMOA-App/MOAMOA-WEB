import { apiClient } from "../libary/reactQueryProvider";
import { MutationConfigOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface Request {
    images: string[];
    idx: number;
    category: string;
}

type Response = any;
const URL_PATH = `api/file`;
const MUTATION_KEY = [URL_PATH];

export const postImage = async (req: Request) => {
    const res = await apiClient.post<Request, AxiosResponse<Response>>(
        URL_PATH,
        req
    );

    return res.data;
};

export const usePostImage = (configOptions?: MutationConfigOptions) => {
    const info = useMutation<Response, void, Request, void>({
        mutationKey: MUTATION_KEY,
        mutationFn: (req) => postImage(req),
        ...configOptions?.options,
        onSuccess: () => {
            // console.log("성공 시 실행")
        },
        onSettled: () => {
            //   console.log("항상 실행");
        },
        onError: (error) => {},
    });

    return info;
};
