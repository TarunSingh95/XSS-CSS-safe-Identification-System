import React, { useState } from 'react';
import person from '../assets/person.png';
import { Link } from 'react-router-dom';
// import axios from 'axios';

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onRegister = async (e) => {
        e.preventDefault();
        // const response = await axios.post("http://localhost:8080/api/auth/register", {name, email ,password});
        console.log(name,email,password)

        setName("")
        setEmail("")
        setPassword("")
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
                            <h4>Create an account here!</h4>
                          </div>

                          </div>
                          
                      <form onSubmit={e=>onRegister(e)}>
                      {/* Input fields */}
                        <div className='form-row'>
                            <div className='col-lg-7'>                 
                                <input className="form-control my-2 p-1" placeholder='Username'  type="text" value={name} onChange={(e) => { setName(e.target.value) }}/>
                            </div>
                        </div>
                        <div className='form-row'>      
                            <div className='col-lg-7'>           
                                <input className="form-control my-2 p-1" placeholder='Email' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }}  />
                            </div>
                        </div>
                              
                        <div className='form-row'>      
                            <div className='col-lg-7'>           
                                <input className="form-control my-2 p-1" placeholder='Password' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}  />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='col-lg-7'>
                                <button className="btn1 p-1 mt-2 mb-3">Register</button>
                            </div>      
                        </div>
                        <div className='form-row'>
                            <div className='col-lg-7'>
                            <Link to='/login' className='justify-content-left'>Already have an account?</Link>
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
