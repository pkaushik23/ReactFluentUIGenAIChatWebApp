import { useState } from 'react'
import { Button } from '@fluentui/react-components';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
      <div className="center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Built with Vite + React</h2>

      <div className="card center">
        <Button appearance="primary" onClick={() => gotoHome() }>Get started</Button>
      </div>

      <p className="read-the-docs center">
          learn more
      </p>

      {/* <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
      </button> */}


    </div>
  )
}

export default App
