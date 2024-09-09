
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { makeStyles, tokens, FluentProvider, webLightTheme, webDarkTheme, Switch, useId, Label, mergeClasses, Tooltip, Divider, Button } from '@fluentui/react-components';


import { Hamburger } from '@fluentui/react-nav-preview';
import ChatBox from '../components/ChatBox';
import { useMasterChatDataContext } from '../contexts/masterChatDataContext';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import SignOut from '../components/SignOut';
import SignIn from '../components/SignIn';
// import NavBar from '../components/NavBar';
import RiteNavBar from '../components/RiteNavBar';



const useStyles = makeStyles({
    root: {
        alignSelf: 'flex-start',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    
    header: {
        background: tokens.colorNeutralBackground6,
        borderRadius: tokens.borderRadiusLarge,
        textAlign: 'left',
        flexShrink: 0,
        paddingLeft:'20px',
        paddingRight:'20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
      
    content: {
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
    },
    sidebar: {
        background: tokens.colorBrandBackground2,
        borderRadius: tokens.borderRadiusLarge,
        padding: '5px',
        margin: '5px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height:'100%'
    },
    sidebarCollapsed: {
        width: '0',
        visibility: 'hidden',
        padding: '0', 
    },
    sidebarExpanded: {
        minWidth: '20%',
    },
    main: {
        backgroundColor: tokens.colorNeutralBackground3,
        borderRadius: tokens.borderRadiusLarge,
        flexGrow: 1,
        flexShrink: 1,
        display:'flex',
        flexDirection:'column',
        padding: '10px',
        margin:'5px 5px 5px 0',
        boxSizing: 'border-box',
        //overflowY: 'scroll',
        
    },
    rightGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px', // Optional: Adds some space between the label and the switch
    },
    menuItems: {
        listStyleType: 'none',
        padding: '5px',
        margin: '5px',
    },
    chatList: {
        listStyleType: 'none',
        // padding: '5px',
        // margin: '5px',
        marginLeft:'-34px',
        cursor: 'pointer' 
    },
    ellipsis: {
        whiteSpace: 'nowrap',       
        overflow: 'hidden',        
        textOverflow: 'ellipsis',   
        maxWidth: '80%'
      }

  });

const Home: React.FC = () => {
    const cssClass = useStyles();
    const navigate = useNavigate();
    const [isDarkTheme, setTheme] = useState(false)
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    
    //Use masterChatContext hook
    let chatDataContext = useMasterChatDataContext();
    // const { instance, accounts } = useMsal();
    const { accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    
    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
      };
    
    const renderHamburgerWithToolTip = () => {
        return (
            <>
            <Tooltip content="Toggle Navbar" relationship="description">
                <Hamburger onClick={() => toggleSidebar()} />
            </Tooltip> 
            </>
        );
    };

    // const updateChatCollection = (newChat:IChatInfo) =>{
    //     setChatCollection((currentValue)=>{
    //         return [newChat,...currentValue]
    //       });
    // }

    return (
        <FluentProvider theme={isDarkTheme ? webDarkTheme:webLightTheme} className='appRoot'>
            <div className={cssClass.root}>
                <div className={cssClass.header}>
                        <h2>Tomato Corp.</h2>
                        <div className={cssClass.rightGroup}>
                            <Divider inset vertical appearance='strong' style={{ height: "100%" }}/>
                            <Label  size='medium' weight='semibold'>Set theme 🔆</Label>
                            <Label  size='small'>Light</Label>
                            <Switch
                                checked={isDarkTheme}
                                onChange={(_, data) => setTheme(!!data.checked)}
                                aria-labelledby={useId("link-label")}
                            />
                            <Label  size='small'>Dark</Label>
                            <Divider inset vertical appearance='strong' style={{ height: "100%" }}/>
                            {isAuthenticated ? <SignOut /> : <SignIn />}
                        </div>
                </div>
                <div className={cssClass.content}>
                        <div className={mergeClasses(cssClass.sidebar, isSidebarCollapsed? cssClass.sidebarCollapsed:cssClass.sidebarExpanded)}>
                            {!isSidebarCollapsed && renderHamburgerWithToolTip()}
                            <Divider inset appearance='strong' style={{ margin: '7px 0 0 0', padding:0 }}/>
                            <RiteNavBar>
                                <ul className={cssClass.chatList}>
                                    <li> <Label size='large' weight='semibold'>Chat List</Label></li>
                                    {
                                        chatDataContext.getChatCollection().map((chat,index) =>{
                                            return <li className={cssClass.ellipsis} key={index} onClick = {() => navigate(`chat/${chat.chatID}`)} title={chat.messages?.[0].msg}>
                                                        {chat.messages?.[0].msg}
                                                    </li>
                                        })
                                    }
                                </ul>

                            </RiteNavBar>
                        </div>
                        <div className={cssClass.main}>
                            <div>
                                {isSidebarCollapsed && renderHamburgerWithToolTip()} 
                                <Label size='large' weight='semibold'>Welcome {accounts[0].name}</Label>
                                <Button onClick={() => navigate('/home') } style={{ margin: '0 0 0 10px', padding:'5px' }}>Start New Chat</Button>
                                <Divider inset appearance='strong' style={{ margin: '10px 0 0 0', padding:0 }}/>
                                
                            </div>
                            
                            {/* Following is ROUTER OUTLET */}
                            <Routes>
                                <Route path="" element={<Navigate to="newchat" />} />
                                <Route path="newchat" element={<ChatBox/>} />
                                <Route path="chat/:id" element={<ChatBox/>} />
                                {/* <Route path="profile" element={<Placeholder name='About Us' />} />
                                <Route path="settings" element={<Placeholder name='Settings' />} /> */}
                            </Routes>
                        </div>
                </div>
            </div>
        </FluentProvider>
    );
}

export default Home;
