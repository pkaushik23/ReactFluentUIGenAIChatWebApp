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
      overflow:'auto'
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

            // **START of STREAM RESPONSE**
            const generator = chatApi.getStreamedAIResponse(currentChatInfo.messages[0].msg); // Get the generator object
            async function processChunks() {
              let lastAiMessageInState:IChatMsgInfo | undefined;
              for await (const aiResponse of generator) {
                setMsgs((currentValue)=>{
                  if(currentValue.length > 1){
                    //BELOW is BAD CODE in REACT, where i am treating state as non immutable
                    //LEAVING HERE AS AN EXAMPLE OF *DONT's*
                    /* let lastAiMessageInState = currentValue[currentValue.length-1];
                    // lastAiMessageInState.msg += aiResponse.msg;
                    // console.log(lastAiMessageInState.msg);
                    // return [...currentValue]*/
                    lastAiMessageInState = { ...currentValue[currentValue.length - 1] };
                    lastAiMessageInState.msg += aiResponse.msg;
                    return [...currentValue.slice(0, -1), lastAiMessageInState];
                  } 
                  else {
                    return [...currentValue, aiResponse];
                  }
                });
              }
              if(currentChatInfo && lastAiMessageInState){
                chatDataContext.updateChatCollection({chatID:currentChatInfo.chatID, messages:[lastAiMessageInState],createDateTime:currentChatInfo.createDateTime});
              }
            }
            
            processChunks().catch((error) => {
              console.error('Error while processing stream:', error);
            });

            // **END of STREAM RESPONSE**

            /**Start of NON STREAM RESPONSE**/
              // chatApi.getAIResponse(currentChatInfo.messages[0].msg).then(response => {
              //   if(currentChatInfo){ 
              //     chatDataContext.updateChatCollection({chatID:currentChatInfo.chatID, messages:[response],createDateTime:currentChatInfo.createDateTime});
              //     setMsgs((currentValue)=>{
              //       return [...currentValue,response]
              //     });
              //   }
              // });
            /**END of NON STREAM RESPONSE**/
          }
          
      }
    }, [currentChatInfo]);

    const onHumanMsgSent = async () => {
      setInputValue('');
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

          // const response = await chatApi.getAIResponse(inputValue);
          // if(response) {
          //     chatDataContext.updateChatCollection({chatID:currentChatInfo.chatID, messages:[response],createDateTime:currentChatInfo.createDateTime});
          //     setMsgs((currentValue)=>{
          //       return [...currentValue,response]
          //     });
          // };

          try {
            const generator = chatApi.getStreamedAIResponse(inputValue); // Get the generator object
            let lastMsg:IChatMsgInfo | undefined;
            for await (const aiResponse of generator) {
              setMsgs((currentValue)=>{
                lastMsg  = { ...currentValue[currentValue.length - 1] };
                if(lastMsg.isHumanMsg){
                  return [...currentValue, aiResponse];
                } else {
                  lastMsg.msg += aiResponse.msg;
                  return [...currentValue.slice(0, -1), lastMsg];
                }
              });
            }
            if(lastMsg){
              chatDataContext.updateChatCollection({chatID:currentChatInfo.chatID, messages:[lastMsg],createDateTime:currentChatInfo.createDateTime});
            }
          } catch (error) {
            console.error('Error during stream consumption:', error);
          }
        }
      }
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
                        return i.id ?<ChatMessage id={i.id} user={i.isHumanMsg?'User':'AI'} message={i.msg} isHumanMsg={i.isHumanMsg} key={i.id}/>:null
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


