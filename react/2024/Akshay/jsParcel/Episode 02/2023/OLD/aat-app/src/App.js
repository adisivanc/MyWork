import React, { useState } from 'react';
import BeforeLoginLayout from './components/BeforeLoginLayout';
import AfterLoginLayout from './components/AfterLoginLayout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? <AfterLoginLayout/> : <BeforeLoginLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
    </div>
  );
};

export default App;

