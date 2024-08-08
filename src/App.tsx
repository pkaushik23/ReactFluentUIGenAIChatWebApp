import { useState } from 'react'
import { Button } from '@fluentui/react-components';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <Button appearance="primary">Get started</Button>
        {/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
        
      </div>
      <p className="read-the-docs center">
          learn more
      </p>
      
    </>
  )
}

export default App
