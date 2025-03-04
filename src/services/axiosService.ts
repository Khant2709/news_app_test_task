import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const createAxios = (contentType: string): AxiosInstance => {
    const config = {
        baseURL: "http://localhost:5000",
        headers: {
            "Content-Type": contentType,
        },
    } as CreateAxiosDefaults;

    return axios.create(config);
};

export const axiosJson: AxiosInstance = createAxios("application/json");