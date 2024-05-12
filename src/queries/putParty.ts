import { apiClient } from "../libary/reactQueryProvider";
import { ApiError, ApiResponse, MutationConfigOptions } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

interface Request {
    product: number;
    pid: number;
}

interface RequestEmailResponse {
    product: number;
    status: boolean;
    message: string;
}

type Response = ApiResponse<RequestEmailResponse>;

const URL_PATH = `api/product`;
const MUTATION_KEY = [URL_PATH];

export const putParty = async (data: Request) => {
    const res = await apiClient.put<Request, AxiosResponse<Response>>(
        `${URL_PATH}/${data.product}/party/${data.pid}`,
        data
    );

    return res.data;
};

export const usePutParty = (configOptions?: MutationConfigOptions) => {
    const queryClient = useQueryClient();
    const info = useMutation<Response, AxiosError<ApiError>, Request, void>({
        mutationKey: MUTATION_KEY,
        mutationFn: (req) => putParty(req),
        ...configOptions?.options,
        onSuccess: (res) => {
            queryClient.invalidateQueries(["partyList"]);
        },
        onSettled: () => {
            //   console.log("항상 실행");
        },
        onError: (error) => {},
    });

    return info;
};
