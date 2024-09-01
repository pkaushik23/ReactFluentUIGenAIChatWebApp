import { Avatar,makeStyles,shorthands,Text, tokens  } from '@fluentui/react-components';
import { PersonLightningRegular } from '@fluentui/react-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import React from 'react';

interface ChatMessageProps {
    user:string,
    message:string,
    isHumanMsg:boolean,
    id:string,
}

const useStyles = makeStyles({

    messageRow: {
      display: 'flex',
      marginBottom: '10px',
      alignItems: 'center',
    },
    messageBubble: {
      ...shorthands.padding('10px'),
      borderRadius: '15px',
      maxWidth: '60%',
    },
    sentMessage: {
      marginLeft: 'auto',
      backgroundColor: tokens.colorNeutralBackground1,
    },
    receivedMessage: {
      backgroundColor: tokens.colorBrandBackground,
      color:'HighlightText'
    },
    avatar: {
      marginRight: '10px', // Add space between avatar and chat bubble for sender
      marginLeft: '10px'
    },
  });

const ChatMessage : React.FC<ChatMessageProps> = ({user,message,isHumanMsg}) => {
    const styles = useStyles();

    return (
        <div className={styles.messageRow}>
            {!isHumanMsg && <Avatar className={styles.avatar} icon={<PersonLightningRegular/>}/>}
            <div className={`${styles.messageBubble} ${isHumanMsg ? styles.sentMessage : styles.receivedMessage}`}>
                {/* <Text>{message}</Text>*/}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown> 
            </div>
            {isHumanMsg && <Avatar name={user} className={styles.avatar} />}
        </div>
    );
    };
export default ChatMessage;