import { UserInfo } from "../models/types/userInfo";

//Module level information
let userData: UserInfo;

export const useAppContext = () => {
    const setUserInfo = (data : UserInfo): void => {
       userData = data;
    }

    const getUserInfo = () =>  {
        return userData;
    }

    return { getUserInfo, setUserInfo };
}

