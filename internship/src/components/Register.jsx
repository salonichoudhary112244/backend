import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    role:'USER'
  });

  const registerUser = () => {
    axios.post('/users/register', user)
      .then(() => {
        alert("Registered Successfully");
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="box">
      <h2>Register</h2>

      <input placeholder="Name"
        onChange={(e)=>setUser({...user,name:e.target.value})} />

      <input placeholder="Email"
        onChange={(e)=>setUser({...user,email:e.target.value})} />

      <input placeholder="Password"
        onChange={(e)=>setUser({...user,password:e.target.value})} />

      <button onClick={registerUser}>Register</button>
    </div>
  )
}

export default Register;