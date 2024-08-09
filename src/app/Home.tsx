
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Placeholder from './Placeholder';
import { makeStyles, tokens, FluentProvider, webLightTheme, webDarkTheme, Switch, useId, Label, shorthands, mergeClasses, Tooltip, LabelProps, Divider } from '@fluentui/react-components';
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
    content: {
        display: 'flex', /* Make content a flex container */
        flexGrow: '1' /* Ensure it takes the remaining height */
    },
    header : { backgroundColor: 'lightgreen', width:'100%' },
    left:{ 
        width: '25%',
        height: '100%', /* Full height of the content area */
        backgroundColor: 'lightblue' 
    },
    right:{
        flexGrow: 1,
        height: '100%', /* Full height of the content area */
        overflowY: 'auto', /* Add vertical scrollbar if content overflows */
        backgroundColor: 'lightcoral' /* For visualization */
    },
    headerNew: {
        background: tokens.colorNeutralBackground6,
        borderRadius: tokens.borderRadiusLarge,
        textAlign: 'left',
        flexShrink: 0,
        paddingLeft:'20px',
        paddingRight:'20px',
        display: 'flex',
        justifyContent: 'space-between',
        // backgroundColor: '#b8e994',
        // padding: '20px'
        // fontSize: '24px',
        // fontWeight: 'bold',
      },
      
    contentNew: {
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
         /* Adjust based on header height */
        /* height: calc(100% - 70px); */
      },
      
    sidebar : {
        background: tokens.colorBrandBackground2,
        borderRadius: tokens.borderRadiusLarge,
        width: '25%',
        padding: '5px',
        margin:'5px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        flexShrink: 0,
      },
      
    mainNew: {
        backgroundColor: tokens.colorNeutralBackground3,
        borderRadius: tokens.borderRadiusLarge,
        flexGrow: 1,
        padding: '10px',
        margin:'5px 5px 5px 0',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        flexShrink: 1,
      },
    field: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    rightGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px', // Optional: Adds some space between the label and the switch
    },
    sidebarN: {
        backgroundColor: '#f3f2f1',
        transition: 'width 0.3s',
        ...shorthands.padding('10px'),
        boxSizing: 'border-box',
        overflowY: 'auto',
        flexShrink: 0,
      },
    sidebarCollapsed: {
        //width: '10px',
        // display:'none'
        width: '0',
        visibility: 'hidden',
        padding: '0', 
    },
    sidebarExpanded: {
        width: '200px',
    },
    toggleButton: {
        marginBottom: '10px',
        width: '100%',
    },
    menuItems: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    
    

  });



const Home: React.FC = () => {
    const cssClass = useStyles();
    const [isDarkTheme, setTheme] = useState(false)
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {

        let props: LabelProps;
        setSidebarCollapsed(!isSidebarCollapsed);
      };
    
    const renderHamburgerWithToolTip = () => {
        return (
            <><Tooltip content="Toggle Navbar" relationship="description">
                <Hamburger onClick={() => toggleSidebar()} /></Tooltip> 
            </>
        );
    };

    return (
        <FluentProvider theme={isDarkTheme ? webDarkTheme:webLightTheme} className='appRoot'>
            <div className={cssClass.root}>
                <div className={cssClass.headerNew}>
                        <h2>Home Page</h2>
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
                <div className={cssClass.contentNew}>
                
                    <div className={mergeClasses(cssClass.sidebar, isSidebarCollapsed? cssClass.sidebarCollapsed:cssClass.sidebarExpanded)}>
                        {/* <Navbar /> */}
                        {!isSidebarCollapsed && renderHamburgerWithToolTip()}
                        <Divider inset appearance='strong' style={{ margin: '7px 0 0 0', padding:0 }}/>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Main Page</Link>
                                </li>
                                <li>
                                    <Link to="profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="settings">Settings</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={cssClass.mainNew}>
                        {isSidebarCollapsed && renderHamburgerWithToolTip()} 
                        <Label size='large' weight='semibold'>OUTLET</Label>
                        <Divider inset appearance='strong' style={{ margin: '10px 0 0 0', padding:0 }}/>
                        {/* Following is ROUTER OUTLET */}
                        <Routes>
                            <Route path="profile" element={<Placeholder name='Profile' />} />
                            <Route path="settings" element={<Placeholder name='settings' />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </FluentProvider>
        
    );
}

export default Home;
    // <div className={cssClass.root}>
    //         <div className={cssClass.header}><h1>Home Page</h1></div>
    //         <div className={cssClass.content}>
    //             <div className={cssClass.left}>
    //                 <nav>
    //                     <ul>
    //                         <li>
    //                             <Link to="/">Main Page</Link>
    //                         </li>
    //                         <li>
    //                             <Link to="profile">Profile</Link>
    //                         </li>
    //                         <li>
    //                             <Link to="settings">Settings</Link>
    //                         </li>
    //                     </ul>
    //                 </nav>
    //             </div>
    //             <div className={cssClass.right}>
    //                 {/* Following is ROUTER OUTLET */}
    //                 OUTLET
    //                 <Routes>
    //                     <Route path="profile" element={<Placeholder name='Profile' />} />
    //                     <Route path="settings" element={<Placeholder name='settings'/>} />
    //                 </Routes>
    //             </div>
    //         </div>
            
            
    //     </div>


    // <div>
    //   {/* <header className="navbar-header">
    //     <h2>Header</h2>
    //   </header> */}
    //   <div>
    //     <h1>Home</h1>
    //   </div>
    //   {/* <footer className="navbar-footer">
    //     <Button>Footer Button</Button>
    //   </footer> */}
    // </div>
