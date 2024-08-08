import React from 'react'
import ReactDOM  from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import App from './App.tsx'
import './index.css'
import Home from './app/Home.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <FluentProvider theme={webLightTheme} className='appRoot'>
        <Router>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home/*" element={<Home />}>
                  {/* <Route path="subroute1" element={<subComp1 />} />
                  OR DEFINE CHILD ROUTES, see HOME component. */}
                </Route>
              </Routes>
        </Router>
      </FluentProvider>
  </React.StrictMode>,
)
