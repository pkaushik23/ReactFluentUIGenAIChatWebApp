
import { getConfig } from "../config/config";
import { LoginFlow } from "../models/types/appTypes";
import { IPublicClientApplication, RedirectRequest } from "@azure/msal-browser";

export const handleLogin = async (instance:IPublicClientApplication,loginType:LoginFlow, state?:any) => {
    await instance.initialize();
    const { loginRequest } = await getConfig();
    let request:RedirectRequest = {...loginRequest};
    if(state){
        request.state = state;
    }
    if (loginType === LoginFlow.Popup) {
        instance.loginPopup(request).catch((e) => {
            console.log(e);
        });
    } else if (loginType === LoginFlow.Redirect) {
        instance.loginRedirect(request).catch((e) => {
            console.log(e);
        });
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