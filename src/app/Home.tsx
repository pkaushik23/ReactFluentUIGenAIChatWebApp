
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Placeholder from './Placeholder';
import { makeStyles } from '@fluentui/react-components';
import '../testing.css'

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
        width: '75%',
        height: '100%', /* Full height of the content area */
        overflowY: 'auto', /* Add vertical scrollbar if content overflows */
        backgroundColor: 'lightcoral' /* For visualization */
    }
  });

const Home: React.FC = () => {
    const cssClass = useStyles();
    return (
        <div className={cssClass.root}>
            <div className={cssClass.header}><h1>Home Page</h1></div>
            <div className={cssClass.content}>
                <div className={cssClass.left}>
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
                <div className={cssClass.right}>
                    {/* Following is ROUTER OUTLET */}
                    OUTLET
                    <Routes>
                        <Route path="profile" element={<Placeholder name='Profile' />} />
                        <Route path="settings" element={<Placeholder name='settings'/>} />
                    </Routes>
                </div>
            </div>
            
            
        </div>
    );
}

export default Home;


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