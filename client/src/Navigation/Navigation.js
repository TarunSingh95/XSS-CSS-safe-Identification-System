import React, {useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'; 
import { AuthContext } from '../Context/AuthContext';

export default function Navigation() {

  const location = useLocation();

  return (
      <nav>
          {
               location.pathname==='/welcome' && location.pathname!=='/users' ?
                  <>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
          </>
          : null
          }
    </nav>
  )
}
