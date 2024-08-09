
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Placeholder from './Placeholder';
import { makeStyles, tokens, FluentProvider, webLightTheme, webDarkTheme, Switch, useId, Label, mergeClasses, Tooltip, Divider } from '@fluentui/react-components';
import Navbar from '../components/Navbar';

import { Hamburger } from '@fluentui/react-nav-preview';
//import '../testing.css'


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
        padding: '10px',
        margin:'5px 5px 5px 0',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        flexShrink: 1,
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
  });



const Home: React.FC = () => {
    const cssClass = useStyles();
    const [isDarkTheme, setTheme] = useState(false)
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

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
                        </div>
                </div>
                <div className={cssClass.content}>
                
                    <div className={mergeClasses(cssClass.sidebar, isSidebarCollapsed? cssClass.sidebarCollapsed:cssClass.sidebarExpanded)}>
                        {/* <Navbar /> */}
                        {!isSidebarCollapsed && renderHamburgerWithToolTip()}
                        <Divider inset appearance='strong' style={{ margin: '7px 0 0 0', padding:0 }}/>
                        <nav>
                            <ul className={cssClass.menuItems}>
                                <li>
                                    <Link to="/">Main Page</Link>
                                </li>
                                <li>
                                    <Link to="profile">About Us</Link>
                                </li>
                                <li>
                                    <Link to="settings">Settings</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={cssClass.main}>
                        {isSidebarCollapsed && renderHamburgerWithToolTip()} 
                        <Label size='large' weight='semibold'>User Area</Label>
                        <Divider inset appearance='strong' style={{ margin: '10px 0 0 0', padding:0 }}/>
                        {/* Following is ROUTER OUTLET */}
                        <Routes>
                            <Route path="profile" element={<Placeholder name='About Us' />} />
                            <Route path="settings" element={<Placeholder name='Settings' />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </FluentProvider>
    );
}

export default Home;
