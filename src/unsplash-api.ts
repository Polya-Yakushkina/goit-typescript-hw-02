import axios, { AxiosResponse } from "axios";
import { ApiResponse, Image } from "./components/types";

axios.defaults.baseURL = "https://api.unsplash.com/";
const myClientID = "Hfk5H68KGr5S2R-0-gE3VTwL3kbT1TbM6PwcjTyJRyU";

export const getImages = async (query: string, page: number):
    Promise<{ results: Image[]; total_pages: number }> => {
    const headers = {
        Authorization: `Client-ID ${myClientID}`,
        "Accept-Version": "v1",
    }
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(`/search/photos`, {
        headers,
        params: {
            query,
            page,
            per_page: 20,
            orientation: "landscape",
        },
    });

    return {
        results: response.data.results as Image[],
        total_pages: response.data.total_pages,
    };
    } catch (error) {
        throw error;
    }
};