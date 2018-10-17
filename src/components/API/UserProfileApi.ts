import BaseApi from './BaseApi';

class UserProfileApi extends BaseApi {
    static async getUserByPhoneNumber(userPhoneNumber: string) {
        return super.getBasic(userPhoneNumber, 'user/phone');
    }

    static async getUserById(userId: string) {
        return super.getBasic(userId, 'user');
    }

    static async getChildrenByParentId(parentId: string) {
        return super.getBasic(`${parentId}/children`, 'user');
    }

    static async getBankCardByChildId(childId: string) {
        return super.getBasic(`${childId}/card`, 'user');
    }
}

export default UserProfileApi;