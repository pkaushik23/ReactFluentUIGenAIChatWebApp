import { getConfig } from "../config/config";
import { UserInfo, UserInfoDb } from "../models/types/userInfo";
import { apiRequest } from "./apiHelper";


export const registerOrUpdateUser = async (userInfo : UserInfoDb):Promise<string> => {
    const { API_URL } = await getConfig();
    const response = await apiRequest<any>('POST',`${API_URL}/RegisterUser`,{},userInfo);
    return response;
}
