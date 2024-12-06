
import { getConfig } from "../config/config";
import { LoginFlow } from "../models/types/appTypes";
import { IPublicClientApplication, RedirectRequest } from "@azure/msal-browser";

// const updateOrRegisterUser = async (userInfo:UserInfoDb) =>{
//     return await registerOrUpdateUser(userInfo)
// }

export const initAndAttachEvents = async (instance:IPublicClientApplication) =>{
    await instance.initialize();
    //const { setUserInfo } = useAppContext();
    instance.addEventCallback(async(event) => {
        // if (event.eventType === EventType.LOGIN_SUCCESS) {

        //All of this is now done in the protectedRoute
        //     // // console.log("Login was successful!", event.payload);
        //     // const authResult = event.payload as AuthenticationResult;
        //     // const updateUser = async () => {
        //     //     try {
        //     //             let userInfoDb = Utility.extractUserInfoFromIdClaims(authResult.idTokenClaims);
        //     //             let userID = await updateOrRegisterUser(userInfoDb);
        //     //             console.log('User updated in DB',userID);
        //     //             let userInfo:UserInfo = {...userInfoDb, user_id : userID}
        //     //             setUserInfo(userInfo);
        //     //     } catch (error) {
        //     //         console.error('Error updating user:', error);
        //     //         alert('Failed to update user in DB');
        //     //     }
        //     // };
        //     // await updateUser();
        // }
    });
}

export const handleLogin = async (instance:IPublicClientApplication,loginType:LoginFlow, state?:any) => {
    await instance.initialize();
    const { loginRequest } = await getConfig();
    let request:RedirectRequest = {...loginRequest};
    if(state){
        request.state = state;
    }
    if (loginType === LoginFlow.Popup) {
        instance.loginPopup(request)
        .catch((e) => {
            console.log(e);
        });
    } else if (loginType === LoginFlow.Redirect) {
        instance.loginRedirect(request)
        .catch((e) => {
            console.log(e);
        })
    }
};

export const handleLogOut = async (instance:IPublicClientApplication,loginType:LoginFlow) => {
    await instance.initialize();
    if (loginType === LoginFlow.Popup) {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/",
          });
    } else if (loginType === LoginFlow.Redirect) {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
          });
    }
};


