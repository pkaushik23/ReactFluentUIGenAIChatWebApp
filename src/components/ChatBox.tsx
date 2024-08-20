import {  Button, Input, makeStyles, shorthands, useId  } from '@fluentui/react-components';
import { apiRequest } from '../services/apiHelper';

import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { IChatMsgInfo, IChatInfo } from '../models/types/chatTypes'
import { useMasterChatDataContext } from '../contexts/masterChatDataContext';
import { useNavigate, useParams } from 'react-router-dom';

interface ChatBoxProps {
    chatInfo? : IChatInfo; //NOT REQUIRED
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

    const componentID = useId();
    console.log('ChatBox componentID:',componentID);
    // console.log('ChatBox, why this is called twice?');
    const navigate = useNavigate();
    
    const { id } = useParams(); // Extracts the id parameter from the route


    //Use masterChatContext
    let chatDataContext = useMasterChatDataContext();
    //console.log('Context chat Data',chatDataContext);


    const styles = useStyles();

    //useState hooks
    const [inputValue, setInputValue] = useState('');

    // get chats based on the chatID in the query string params.
    let currentChat:IChatInfo|undefined;
    if(id){
      currentChat = chatDataContext.getChatByID(id)
    }

    const [msgs, setMsgs] = useState<IChatMsgInfo[]>(currentChat?.messages??[]);
    
    //useEffect, as when the component reloading is not happening, then msgs are not updated with currentChat.
    useEffect(() => {
      if (currentChat?.messages) {
          setMsgs(currentChat.messages);
      }
    }, [currentChat]);

    const onHumanMsgSent = async () => {
      let humanMessage = {isHumanMsg:true,msg:inputValue,id:crypto.randomUUID()};
      setMsgs((currentValue)=>{
        return [...currentValue,humanMessage]
      });
      
      // if(!chatInfo && updateChatCollection){// means it is start if new chat, hence let the parent know it is a new chat.
      //   updateChatCollection({chatID:crypto.randomUUID(),messages:[{id:crypto.randomUUID(),isHumanMsg:true,msg:inputValue}]});
      // }

      if(chatDataContext.updateChatCollection){
        let msgs =[humanMessage];
        if(!currentChat){
          currentChat = {chatID : crypto.randomUUID()};
        }
        chatDataContext.updateChatCollection({chatID:currentChat.chatID, messages:msgs});
        if(!id){ //means coming from newChat
          navigate(`../chat/${currentChat.chatID}`);
        }
        
      }

      //Do API CALL FOR ANSWER
      // const response = await apiRequest<any>('POST',
      //                 'http://localhost:7071/api/HttpExample',{},
      //                 {name:inputValue});
      // // const response = await apiRequest<any>('get','https://jsonplaceholder.typicode.com/posts/1');
      // // Update state with the response data
      // console.log(response);
      // setMsgs((currentValue)=>{
      //   return [...currentValue,{isHumanMsg:false,msg:response,id:crypto.randomUUID()}]
      // });
      setInputValue('');
    }
    
    return (
        <>
        {id && <p>Chat ID: {id}</p>} 
        { id && msgs.length < 1 && <span>Not able to find chat history.</span>}
        {!id  && <p>Hello, How can i help? Start by asking a question.</p>}
        
        {
            !chatInfo?.chatID ? 
                  <div className={styles.chatContainer}>
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


