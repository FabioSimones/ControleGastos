import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.response.use(
  (r) => r,
  (error) => {
    const data = error?.response?.data;

    const validationErrors = data?.errors;
    if (validationErrors && typeof validationErrors === "object") {
      const firstField = Object.keys(validationErrors)[0];
      const firstMsg = validationErrors[firstField]?.[0];
      return Promise.reject(new Error(firstMsg ?? "Dados inválidos."));
    }

    const message =
      data?.message ??
      data?.title ??
      error?.message ??
      "Erro ao comunicar com API";

    return Promise.reject(new Error(message));
  }
);