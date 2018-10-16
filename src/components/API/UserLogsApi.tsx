import BaseApi from './BaseApi';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import axios from "axios";

class UserLogsApi extends BaseApi {
    static async getLogs(request: string) {
        return super.getBasic(request, 'log/user');
    };

    static async getTransactionsLogs(userId: string) {
        return super.getBasic(userId, 'log/user/transactions');
    };

    static async getRegistrationLogs(request: string) {
        return super.getBasic(request, 'log/phone');
    };

    static async getComparedLogs(firstRequest: string, secondRequest: string) {

        const [firstUserLogs, secondUserLogs] = [
            await super.getBasic(firstRequest, 'log/user'),
            await super.getBasic(secondRequest, 'log/user'),
        ];

        const comparedLogs = [...firstUserLogs.hits, ...secondUserLogs.hits];
        comparedLogs.sort((prevLog, nextLog) => nextLog.time - prevLog.time);

        return comparedLogs;
    };
}

export default UserLogsApi;
