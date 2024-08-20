import React from 'react'
import ReactDOM  from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';

import App from './App.tsx'
import './site.css'
import Home from './app/Home.tsx';
import MasterChatDataProvider from './contexts/masterChatDataContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <div className='appRoot'>
        <MasterChatDataProvider>
          <Router>
                <Routes>
                  <Route path="/" element={<App />} />
                    <Route path="/home/*" element={<Home />}>
                      {/* <Route path="subroute1" element={<subComp1 />} />
                      OR DEFINE CHILD ROUTES, see HOME component. */}
                    </Route>
                </Routes>
          </Router>
        </MasterChatDataProvider>
      </div>
  </React.StrictMode>,
)
