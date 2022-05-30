// react imports
import React from 'react';

// third party imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// internal imports
import Login from '../Authentication/Login';
import SignUpView from '../Authentication/SignUp';
import Home from '../Home';
import ProtectedRoute from '../ProtectedRoute';
import { UserAuthContextProvider } from '../../context/UserAuthContext';



const App = () => {

  return <>
    <Router>
      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          >
          </Route>
          <Route exact path='/signin' element={<Login />}>
          </Route>
          <Route exact path='/signup' element={<SignUpView appName='' />}>
          </Route>
          <Route exact path='/signin' element={<Login />}>
          </Route>
        </Routes>
      </UserAuthContextProvider>
    </Router>
  </>
}

export default App;
