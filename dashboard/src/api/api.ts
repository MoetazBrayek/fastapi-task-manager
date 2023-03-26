import axios from 'axios';




const BASE_URL = 'http://127.0.0.1:8000';

// TO:DO AsyncHandler AS WELL AS ERROR HANDLING

export const login = async (username: string, password: string) => {
    try{
    const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
    });
    console.log(response);
    return response;
    }
    catch(error){
        console.log(error);
        return error;
    }
}