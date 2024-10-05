
import { getConfig } from "../config/config";
import { LoginFlow } from "../models/types/appTypes";
import { AuthenticationResult, EventType, IPublicClientApplication, RedirectRequest } from "@azure/msal-browser";
import { Utility } from "../utils/utils";
import { registerOrUpdateUser } from "./userApi";




const updateOrRegisterUser = async (idTokenClaims:any) =>{
    let userInfo = Utility.extractUserInfoFromIdClaims(idTokenClaims);
    console.log(userInfo);
    return await registerOrUpdateUser(userInfo)
}

export const initAndAttachEvents = async (instance:IPublicClientApplication) =>{
    await instance.initialize();
    instance.addEventCallback(async(event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS) {
            // console.log("Login was successful!", event.payload);
            const result = event.payload as AuthenticationResult;
            const updateUser = async () => {
                try {
                    await updateOrRegisterUser(result.idTokenClaims);
                    //console.log('User updated in DB');
                } catch (error) {
                    console.error('Error updating user:', error);
                    alert('Failed to update user in DB');
                }
            };
            await updateUser();
        }
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
        // .finally(() =>
        //     {
        //         console.log('updateOrRegisterUser');
        //         if(instance.getAllAccounts().length > 0){
        //             return updateOrRegisterUser(instance.getAllAccounts()[0]);
        //         }    
        //     }
        // )
        // .then(r => {
        //         console.log("loginPopup",r);
        //     }
        // )
        .catch((e) => {
            console.log(e);
        });
    } else if (loginType === LoginFlow.Redirect) {
        instance.loginRedirect(request)
        .catch((e) => {
            console.log(e);
        })
        // .then(r => {
        //     console.log("loginRedirect",r);
        // }
        // )
        // .finally(
        //     () =>             
        //     {   
        //         console.log('updateOrRegisterUser');
        //         if(instance.getAllAccounts().length > 0){
        //             return updateOrRegisterUser(instance.getAllAccounts()[0]);
        //         }    
        //     }
        // );
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


