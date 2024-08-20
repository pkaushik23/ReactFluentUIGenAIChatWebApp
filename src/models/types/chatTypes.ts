export interface IChatMsgInfo {
  isHumanMsg: boolean,
  msg: string
  id: string
}

export interface IChatInfo {
  chatID?: string,
  messages?: IChatMsgInfo[],
  // isTerminated?:boolean,
  // totalInputTokens?:number,
  // totalOutputTokens?:number
}

export interface MasterChatDataContextType  {
  // chats: IChatInfo[];
  getChatByID: (id:string) => IChatInfo|undefined;
  getChatCollection: () => IChatInfo[]; 
  updateChatCollection: (chatInfo:IChatInfo) => void;
}