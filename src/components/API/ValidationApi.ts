import axios from 'axios';

class ValidationApi {
    static async validateUser(login: string, password: string){
        //create request to express route /login
        return true;
    };

    static async validatePincode(pincode: string){
        //create request to express route /auth
        return true;
    };
}

export default ValidationApi;