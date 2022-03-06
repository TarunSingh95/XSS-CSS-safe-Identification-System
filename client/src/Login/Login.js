import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import person from '../assets/person.png';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const headers = {
    "Content-type" : "application/JSON"
}
    
export default function Login() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");

    const { accessToken, setAccessToken, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    
    useEffect(() => {

        let isMounted = true;

        if (accessToken && isLoggedIn) {
            navigate("/users", { return: true })
        }
    
      return () => {
        //   setPassword("");
        //   setName("");
        isMounted = false;
      }
    }, [])
    

    const onLogin = async (e) => {
    
        try {
            e.preventDefault();
            // const response = await axios.post("http://localhost:8080/api/auth/login", {username:name, password:password});
            const response = await axios.post('http://localhost:8080/api/auth/login',
                JSON.stringify({ username: name, password }),
                { headers, withCredentials: true })
            
            if (response?.status === 200 && response?.statusText === 'OK' && response?.data?.message === 'Success.') {
                    setAccessToken(response.data.access);
                    setIsLoggedIn(true)
                    navigate("/users", { replace: true });
                
            }
        }
        catch (error) {
            console.log(error.message);
        }
        finally { 
            setName("")
            setPassword("")
        }

    }

  return (
      <div>
        <section className="Form my-4 mx-5" >
              <div className='container'>
                <div className='row no-gutters py-3'>
                  <div className='col-lg-5'>
                      <img className='img-fluid  person' src={person} alt="person.jpg" />
                  </div>
                      <div className='col-lg-6 px-5 pt-5' >
                          <div className='col-lg-7'>
                            <div className='form-row'>
                            <h1 className="font-weight-bold py-3">Welcome!</h1>
                            <h4>Sign into your account</h4>
                          </div>

                          </div>
                          
                      <form onSubmit={(e) => { onLogin(e) }}>
                      {/* Input fields */}
                        <div className='form-row'>
                            <div className='col-lg-7'>                 
                                <input className="form-control my-2 p-1" placeholder='Username' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                        </div>
                        <div className='form-row'>      
                            <div className='col-lg-7'>           
                                <input className="form-control my-2 p-1" placeholder='Password' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='col-lg-7'>
                                      <button className="btn1 p-1 mt-2 mb-3">Login</button>
                            </div>      
                        </div>
                        <div className='form-row'>
                            <div className='col-lg-7'>
                            <Link to='/register' className='justify-content-left'>Need an account?</Link>
                            </div>      
                        </div>
                        </form>
                    </div>
                </div>
              </div>
        </section>

      </div>
  )
}
