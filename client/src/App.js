import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from "./Login/Login";
import Register from "./Register/Register";
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';
import Users from './Users/Users';
import { AuthContext } from './Context/AuthContext';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PersistUser from './PersistUser/PersistUser';

function App() {
  
  const [accessToken, setAccessToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (

      <div className="App">
        <Router>
          <AuthContext.Provider value={{accessToken, setAccessToken, isLoggedIn, setIsLoggedIn}}>
            <Routes>
            {/* <Route exact path="/"></Route> */}       
              <Route exact path="/login"  element={<Login/>} /> 
              <Route exact path="/register" element={<Register />} />
            
              <Route element={<PersistUser />} >
              <Route element={<PrivateRoute access={{ accessToken, isLoggedIn }} />}>
                <Route exact path="/users" element={<Users />} />
                <Route exact path="/home" element={<Home />} />
              </Route>

            </Route>
              <Route exact path="*"  element={<Login/>} />
            </Routes>
            </AuthContext.Provider>
        </Router>
      </div>
  );
}

export default App;
