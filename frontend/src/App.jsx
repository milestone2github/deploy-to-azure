import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Login from './pages/Login'

function App() {
  const [response, setResponse] = useState(null);

  console.log('frontend env: ', import.meta.env.VITE_APP_BACKEND_URL); //debug


  const testHelloAPI = async () => {
    try {
      console.log("Inside Test Hello API");
      
      const res = await axios.get( `${import.meta.env.VITE_APP_BACKEND_URL}/api/hello`,
        { withCredentials: true } // required to include session cookies as it allows sending cookies for session
      );
      
      console.log("API Response:", res.data);
      setResponse(res.data.message);
    } catch (error) {
      console.error("Error calling /api/hello:", error);
    }
  };

  return (
    <>
      <Login />
      
      {/*  Test button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={testHelloAPI}>Test /hello</button>
        {response && <p>{response}</p>}
      </div>
    </>
  )
}

export default App
