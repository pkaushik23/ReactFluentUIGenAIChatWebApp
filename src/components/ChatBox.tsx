import {  Button, Input, makeStyles, shorthands  } from '@fluentui/react-components';
import { apiRequest } from '../services/apiHelper';

import React, { useState } from 'react';
import ChatMessage from './ChatMessage';

interface IChatMsgInfo{
  isHumanMsg:boolean,
  msg:string
  id:string
}

interface IChatInfo {
    chatID?: string,
    messages?: IChatMsgInfo[],
    // isTerminated?:boolean,
    // totalInputTokens?:number,
    // totalOutputTokens?:number
}
interface ChatBoxProps {
    chatInfo : IChatInfo;
}

const useStyles = makeStyles({
    chatContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow:1,
      ...shorthands.padding('10px'),
    },
    messagesContainer: {
      flexGrow: 1,
      overflowY: 'auto',
      ...shorthands.padding('10px'),
    //   backgroundColor: '#f3f2f1',
      borderRadius: '8px',
    },
    
    inputContainer: {
      display: 'flex',
      //...shorthands.marginTop('10px'),
      alignItems: 'center',
    },
    inputField: {
      flexGrow: 1,
      marginRight: '10px',
    },
    
  });

const ChatBox : React.FC<ChatBoxProps> = ({chatInfo}) => {
    const styles = useStyles();
    const [inputValue, setInputValue] = useState('');

    const [msgs, setMsgs] = useState<IChatMsgInfo[]>([
      {isHumanMsg:true,msg:"What is the capital of India",id:crypto.randomUUID()},
      {isHumanMsg:false,msg:"New Delhi is the capital of Republic of India",id:crypto.randomUUID()},
    ])

    const onHumanMsgSent = async () => {
      setMsgs((currentValue)=>{
        return [...currentValue,{isHumanMsg:true,msg:inputValue,id:crypto.randomUUID()}]
      });
      
      
      const response = await apiRequest<any>('get','https://jsonplaceholder.typicode.com/posts/1');
      // Update state with the response data
      console.log(response);
      setMsgs((currentValue)=>{
        return [...currentValue,{isHumanMsg:false,msg:response.body,id:crypto.randomUUID()}]
      });
      setInputValue('');
    }

    return (
        <>
        {
            !chatInfo.chatID ? 
                  <div className={styles.chatContainer}>
                        <p>Hello, How can i help? Start by asking a question.</p>
                        sample chat
                        <div className={styles.messagesContainer}>
                            {
                              msgs.map((i)=>{
                                return <ChatMessage id={i.id} user={i.isHumanMsg?'User':'AI'} message={i.msg} isSender={i.isHumanMsg} key={i.id}/>
                              })
                            }
                        </div>
                        <div className={styles.inputContainer}>
                            <Input className={styles.inputField} placeholder="Type a message" 
                                    value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                            <Button onClick={() =>onHumanMsgSent()}>Send</Button>
                        </div>
                    </div>
                 :<p>chat history</p>
                    
        }
        </>
    )
}

export default ChatBox