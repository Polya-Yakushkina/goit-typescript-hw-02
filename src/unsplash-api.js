import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const myClientID = "Hfk5H68KGr5S2R-0-gE3VTwL3kbT1TbM6PwcjTyJRyU";

export const getImages = async (query, page) => {
    const response = await axios.get(`/search/photos`, {
        headers: {
            Authorization: `Client-ID ${myClientID}`,
            "Accept-Version": "v1",
        },
        params: {
            query,
            page,
            per_page: 20,
            orientation: "landscape",
        },
    });

    return {
        results: response.data.results,
        total_pages: response.data.total_pages,
    };
};