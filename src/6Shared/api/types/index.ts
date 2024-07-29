import { AxiosError } from "axios";

export type ApiResponseType<T = any> = { statusCode: number; message?: string; data?: T };

export type ApiErrorType = AxiosError<ApiResponseType>;
