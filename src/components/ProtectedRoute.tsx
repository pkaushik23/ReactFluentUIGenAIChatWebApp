import React, { ReactNode, useEffect } from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { handleLogin } from '../services/msalHelper';
import { LoginFlow } from '../models/types/appTypes';
import { InteractionStatus } from '@azure/msal-browser';
import { Utility } from '../utils/utils';
import { registerOrUpdateUser } from '../services/userApi';
import { UserInfo, UserInfoDb } from '../models/types/userInfo';
import { useAppContext } from '../hooks/useAppContext';

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    const { instance, accounts, inProgress } = useMsal();
    const { setUserInfo } = useAppContext();

    const handleSignIn = () => {
        handleLogin(instance, LoginFlow.Redirect);
    };

    useEffect(() => {
        if (!isAuthenticated) {
          handleSignIn();
        } else if(
            isAuthenticated &&
            inProgress === InteractionStatus.None &&
            accounts &&
            accounts.length > 0){
            const updateOrRegisterUser = async (userInfo:UserInfoDb) =>{
                return await registerOrUpdateUser(userInfo)
            }

            let userInfoDb = Utility.extractUserInfoFromIdClaims(accounts[0].idTokenClaims);
            updateOrRegisterUser(userInfoDb).then(userID => {
                console.log('User updated in DB',userID);
                let userInfo:UserInfo = {...userInfoDb, user_id : userID}
                setUserInfo(userInfo);
            });
        }
      }, [isAuthenticated]);

    if(
        isAuthenticated &&
        inProgress === InteractionStatus.None &&
        accounts &&
        accounts.length > 0
    ){
        return children;
    }
    return null;
};

export default ProtectedRoute;
