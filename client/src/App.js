import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('/api/test')  
      .then(response => console.log(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>EZResume Frontend on Port 8000</h1>
    </div>
  );
}

export default App;
