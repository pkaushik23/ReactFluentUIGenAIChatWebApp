import React from 'react'
import ReactDOM  from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';

import App from './App.tsx'
import './site.css'
import Home from './app/Home.tsx';
import MasterChatDataProvider from './contexts/masterChatDataContextProvider.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { getConfig } from './config/config.ts';
import { initAndAttachEvents } from './services/msalHelper.ts';

getConfig().then((config)=>{
  const msalInstance = new PublicClientApplication(config.msalConfig);
  initAndAttachEvents(msalInstance);
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div className='appRoot'>
          <MasterChatDataProvider>
          <MsalProvider instance={msalInstance}>
            <Router>
                  <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/home/*" element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }>
                    {/* <Route path="subroute1" element={<subComp1 />} />
                    OR DEFINE CHILD ROUTES, see HOME component. */}
                    </Route>
                  </Routes>
            </Router>
            </MsalProvider>
          </MasterChatDataProvider>
        </div>
    </React.StrictMode>,
  )
});;

