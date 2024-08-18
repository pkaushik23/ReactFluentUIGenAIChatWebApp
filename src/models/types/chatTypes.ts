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