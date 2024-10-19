import axios, { AxiosError } from "axios";

import { API_BASE_URL, xApiKey } from "@/constants/env.constants";

const defaultHeaders = {
  "Content-Type": "application/json",
  "x-api-key": xApiKey,
};

export const portalApi = axios.create({
  baseURL: API_BASE_URL,
  headers: defaultHeaders,
});

export const getErrorMessage = (error: Error) =>
  (error as AxiosError<{ message: string }>)?.response?.data?.message ||
  error.message;
