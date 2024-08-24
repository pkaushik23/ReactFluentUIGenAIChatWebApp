import {  Button, Input, makeStyles, shorthands, useId  } from '@fluentui/react-components';

import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { IChatMsgInfo, IChatInfo } from '../models/types/chatTypes'
import { useMasterChatDataContext } from '../contexts/masterChatDataContext';
import { useNavigate, useParams } from 'react-router-dom';
import  *  as chatApi from '../services/chatApi';

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

const ChatBox : React.FC = () => {

    // const componentID = useId();
    // console.log('ChatBox componentID:',componentID);
    const navigate = useNavigate();
    const { id } = useParams(); // Extracts the id parameter from the route
    //Use masterChatContext
    let chatDataContext = useMasterChatDataContext();//console.log('Context chat Data',chatDataContext);
    const styles = useStyles();
    //useState hooks
    const [inputValue, setInputValue] = useState('');
    // get chats based on the chatID in the query string params.
    let currentChatInfo:IChatInfo|undefined;
    if(id){
      currentChatInfo = chatDataContext.getChatByID(id)
      
    }

    const [msgs, setMsgs] = useState<IChatMsgInfo[]>(currentChatInfo?.messages??[]);

    //useEffect, as when the component reloading is not happening, then msgs are not updated with currentChat.
    useEffect(() => {
      if (currentChatInfo?.messages) {
          setMsgs(currentChatInfo.messages);
          //   //&& (new Date().getTime()  - currentChat.messages[0].createDateTime.getTime() < 2 ) 
          if(currentChatInfo.messages.length == 1 ){
            //if current's msg count is 1, and dateTime create is only few seconds apart then call get_gen_ai_response.
            chatApi.getAIResponse(currentChatInfo.messages[0].msg).then(response => {
              if(currentChatInfo){ // TODO : why is this necessary
                chatDataContext.updateChatCollection({chatID:currentChatInfo.chatID, messages:[response],createDateTime:currentChatInfo.createDateTime});
                setMsgs((currentValue)=>{
                  return [...currentValue,response]
                });
              }
            });
          }
          
      }
    }, [currentChatInfo]);

    const onHumanMsgSent = async () => {
      let humanMessage = {isHumanMsg:true,msg:inputValue,id:crypto.randomUUID(), createDateTime: new Date()};
      setMsgs((currentValue)=>{
        return [...currentValue,humanMessage]
      });
      
      if(chatDataContext.updateChatCollection){
        let msgs =[humanMessage];
        if(!currentChatInfo){
          currentChatInfo = {chatID : crypto.randomUUID(), createDateTime: new Date()};
        }
        chatDataContext.updateChatCollection({chatID:currentChatInfo.chatID, messages:msgs,createDateTime:currentChatInfo.createDateTime});
        if(!id){ //means coming from newChat
          navigate(`../chat/${currentChatInfo.chatID}`);
        } 
        else {
          const response = await chatApi.getAIResponse(inputValue);
          if(response) {
              chatDataContext.updateChatCollection({chatID:currentChatInfo.chatID, messages:[response],createDateTime:currentChatInfo.createDateTime});
              setMsgs((currentValue)=>{
                return [...currentValue,response]
              });
          };
        }
      }
      setInputValue('');
    }
    
    return (
        <>
        {id && <p>Chat ID: {id}</p>} 
        { id && msgs.length < 1 && <span>Not able to find chat history.</span>}
        {!id  && <p>Hello, How can i help? Start by asking a question.</p>}
        
        {
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
                    <Button onClick={async () => await onHumanMsgSent()}>Send</Button>
                </div>
            </div>
        }
        </>
    )
}

export default ChatBox


