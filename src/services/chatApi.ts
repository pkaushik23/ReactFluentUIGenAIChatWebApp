import { IChatMsgInfo } from "../models/types/chatTypes";
import { apiRequest } from "./apiHelper";
import { API_URL } from '../config/config';

/*TODO:

-2)
-1) url and other settings to read from config
0)  Deploy to Azure.
1)  streaming response.
2)  Cancellable API request
3)  formatter viewer in the chat, for example viewer to show the code and markdown.
4)  loger
5)  App level error handling
6)  Db persistance
7)  Chat memory
8)  Function calling
9)  File upload
10) Agents.

*/

export const getAIResponse = async (msg:string):Promise<IChatMsgInfo> => {
    const response = await apiRequest<any>('POST',`${API_URL}/HttpExample`,{},
                    {name:msg});
    return {isHumanMsg:false,msg:response,id:crypto.randomUUID(), createDateTime: new Date()};
  }