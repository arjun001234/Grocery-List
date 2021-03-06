import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import AnimationPage from './Skeleton'
import { useState } from 'react';

const Index = () => {
  const[isLoading,setIsLoading] = useState(true);

  const handleCheck = () => {
    setTimeout(() => setIsLoading(false),1000 )
    
  }
  React.useEffect(()=> handleCheck(),[])
  return (
    <div>
      {
        isLoading ? <AnimationPage /> : 
        <App />
      }
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

