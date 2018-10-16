import axios from 'axios';
//import { apiUrl } from 'config';
const apiUrl = 'http://localhost:3000/api/v1';

class BaseApi {
    protected static baseURL: string;
    static async getBasic(param: string, urlParam: string) {
        this.baseURL = apiUrl;

        try {
            const res = await axios.get(`${this.baseURL}/${urlParam}/${param}`);
            return res.data;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
            return 'Server Error';
        }
    };
}

export default BaseApi;