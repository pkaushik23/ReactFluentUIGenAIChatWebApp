import { ReactNode, useState } from "react";
import { MasterChatDataContext } from "./masterChatDataContext";
import { IChatInfo } from "../models/types/chatTypes";

type MasterChatDataProviderProps = {
    children: ReactNode;
}

const MasterChatDataProvider: React.FC<MasterChatDataProviderProps> = ({children}) => {
    // const navigate = useNavigate();
    const[chatCollection, setChatCollection] = useState<IChatInfo[]>([]);
    
    const getChatData = ():IChatInfo[] =>{
        //console.log('Prerak');
        if (chatCollection && chatCollection.length > 0) return chatCollection;
        //do api call here 
        return  [];
    };
    
    const getChatByID = (id:string):IChatInfo|undefined => {
        return chatCollection.find(chat => chat.chatID == id); 
    }

    const updateChatCollection = (chat:IChatInfo):void =>{
        // let isExistingChat = false;
        setChatCollection((currentCollection)=>{
            let chatIndex = currentCollection.findIndex(c => c.chatID == chat.chatID);
            if(chatIndex >=0){
                //isExistingChat = true;
                let currentMessages = currentCollection[chatIndex].messages || [];
                let msgs = chat.messages || [];
                
                currentCollection[chatIndex].messages = [...currentMessages,...msgs];
                return currentCollection;
            }
            return [chat,...currentCollection];
        });
        // if(!isExistingChat){
        //     navigate(`chat/${chat.chatID}`);
        // }
    }
   

    const getProviderData = () =>{
        return {
            getChatCollection: getChatData,
            getChatByID:getChatByID,
            updateChatCollection:updateChatCollection
        }
    }

    return (
        <MasterChatDataContext.Provider value= {getProviderData()}>
            {children}
        </MasterChatDataContext.Provider>

        //following does not work, WHY ?
        // <MasterChatDataContext.Provider value= {{getChatData}}>
        //     {children}
        // </MasterChatDataContext.Provider>
    );
}

export default MasterChatDataProvider;





