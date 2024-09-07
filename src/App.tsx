import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@fluentui/react-components';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import { useIsAuthenticated } from '@azure/msal-react';


//Try FluentStyling here.
const useStyles = makeStyles({
  appContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
  },
});


function App() {
  const navigate = useNavigate();

  const cssClass = useStyles();

  const gotoHome = () => {
    navigate('/home');
  };
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className={cssClass.appContainer}>
      <h1>Rite GPT</h1>
      Built with React and Vite

      <div className="card center">
         {isAuthenticated ? <SignOut /> : <SignIn />}
        <h3>
          <button className='button' onClick={() => gotoHome() }>Get started</button>
        </h3>
      </div>

      <p className="read-the-docs center">
          learn more
      </p>
      <div className="center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
  )
}

export default App
