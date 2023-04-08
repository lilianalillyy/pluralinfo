import axios, {AxiosResponse} from "axios";
import {clearFlashes, flash, FlashType} from "../store";

export interface SuccessResponse<TData extends object = object> {
    success: true
    data: TData
}

export interface ErrorResponse {
    success: false
    error: string
}

export type Response<TData extends object> = SuccessResponse<TData> | ErrorResponse;

export const $axios = axios.create({
    baseURL: (import.meta as any).env?.VITE_API_URL ?? (import.meta as any).env?.DEV ? "http://localhost:3000" : 'https://plurali-api.onrender.com',
    withCredentials: true
})

export const formatError = (e: any) => e?.response?.data?.error ?? e?.message ?? 'Unknown error has occurred. Please try again.'

export const wrapRequest = async <T extends object = object>(promise: () => Promise<AxiosResponse<Response<T>>>): Promise<T|false> => {
    clearFlashes()
    try {
        const res = await promise();
        if (!res.data.success) throw new Error(res.data.error);

        return res.data.data;
    } catch (e) {
        flash(formatError(e), FlashType.Danger, true)
        return false;
    }
}