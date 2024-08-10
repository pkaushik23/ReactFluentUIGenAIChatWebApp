import { useState } from 'react'
import { Button } from '@fluentui/react-components';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@fluentui/react-components';

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
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  const cssClass = useStyles();

  const gotoHome = () => {
    navigate('/home');
  };

  return (
    <div className={cssClass.appContainer}>
      
      <h1>Rite GPT</h1>
      Built with React and Vite

      <div className="card center">
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
