import axios from 'axios';

class ValidationApi {
    static async validateUser(login: string, password: string) {
        //create request to express route /login
        if(login === 'admin' && password === '111'){
            return true;
        } else {
            throw new Error('Login or password are incorrect!');
        }
    };

    static async validatePincode(pincode: string) {
        //create request to express route /auth
        if(pincode === '111111'){
            return true;
        } else {
            throw new Error('Invalid pincode!');
        };
    };
}

export default ValidationApi;