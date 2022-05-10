// react imports
import React, { createContext, useState, useEffect, useContext } from 'react';

// third party imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// internal imports
import Login from '../Authentication/Login';
import SignUpView from '../Authentication/SignUp';



const ResponsiveContext = createContext()
const App = () => {
  const [appState, setAppState] = useState({ mobileView: false });



  const setResponsive = () => {
    return window.innerWidth < 720 ? setAppState((prevState) => ({ ...prevState, mobileView: true })) : setAppState((prevState) => ({ ...prevState, mobileView: false }))
  }

  useEffect(() => {
    window.addEventListener('resize', setResponsive)

    return () => {
      window.removeEventListener('resize', setResponsive)
    }
  }, [])

  return <>
    <Router>
      <ResponsiveContext.Provider value={{ appState }}>
        <Routes>

          <Route exact path='/signup' element={<SignUpView appName='Messenger' />}>
          </Route>
          <Route exact path='/signin' element={<Login />}>
          </Route>
        </Routes>
      </ResponsiveContext.Provider>
    </Router>
  </>
}

export const useGlobalContext = () => {
  return useContext(ResponsiveContext)
}
export default App;
