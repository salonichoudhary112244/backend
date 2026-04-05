import React, { useState } from 'react';
import axios from 'axios';

function Login() {

  const [login, setLogin] = useState({
    email:'',
    password:''
  });

  const loginUser = () => {
    axios.post('http://localhost:8080/api/login', login)
      .then(res => {
        localStorage.setItem("token", res.data);
        alert("Login Success");
      });
  }

  return (
    <div className="box">
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={(e)=>setLogin({...login,email:e.target.value})} />

      <input placeholder="Password"
        onChange={(e)=>setLogin({...login,password:e.target.value})} />

      <button onClick={loginUser}>Login</button>
    </div>
  )
}

export default Login;