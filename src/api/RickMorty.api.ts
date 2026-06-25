import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllCharactersApi = axios.create({
    baseURL: `${BASE_URL}/character`
});
