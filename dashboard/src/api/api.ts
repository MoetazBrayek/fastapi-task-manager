import axios from 'axios';




const BASE_URL = 'http://127.0.0.1:8000';


export const login = async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
    });
    return response.data;
    }
    