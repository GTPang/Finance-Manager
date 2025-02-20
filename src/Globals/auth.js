import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

export const login = async (username, password) => {
    const parsedData = { username: username, password: password };
    try {
        const response = await axiosInstance.post(`/auth/login`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err;
    }
}