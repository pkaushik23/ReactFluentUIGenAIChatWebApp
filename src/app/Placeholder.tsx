import React from 'react';


const Placeholder: React.FC<{name:string}> = ({name}) => {
  return (
    <h1>This is {name} page</h1>
  )
}

export default Placeholder