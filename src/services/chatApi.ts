import { IChatMsgInfo } from "../models/types/chatTypes";
import { apiRequest, streamedApiRequest } from "./apiHelper";
import { getConfig } from '../config/config';

/*TODO:
-3) 
-2) Login, MSAL [Done]
-1) url and other settings to read from config [DONE] "/config/config.ts"
0)  Deploy to Azure. [DONE] Thin client deployed to Static web app
1)  streaming response.[DONE]
2)  Cancellable API request
3)  formatter viewer in the chat, for example viewer to show the code and markdown. [DONE, 'ReactMarkdown' and 'remarkGfm']
4)  logger
5)  App level error handling
6)  Db persistance
7)  Chat memory
8)  Function calling
9)  File upload
10) Agents.

*/

export const getAIResponse = async (msg:string):Promise<IChatMsgInfo> => {
    const { API_URL } = await getConfig();
    const response = await apiRequest<any>('POST',`${API_URL}/HttpExample`,{},
                    {question:msg});
    return {isHumanMsg:false,msg:response,id:crypto.randomUUID(), createDateTime: new Date()};
  }

export const getStreamedAIResponse = async function* (msg:string): AsyncGenerator<IChatMsgInfo> {
    let isFirstChunk = true;
    const { API_URL } = await getConfig();
    for await (const chunk of streamedApiRequest(`${API_URL}/HttpExampleStreamed`, 'POST', { question: msg })) {
        
        let response:IChatMsgInfo = {isHumanMsg:false,msg:chunk};
        if(isFirstChunk){
            response.id = crypto.randomUUID();
            response.createDateTime =  new Date()
        }
        yield response;
      }


    //use yield* when we want to directly return the response from generator.
    //yield* streamedApiRequest(`${API_URL}/HttpExampleStreamed`, 'POST', {name:msg});
}
