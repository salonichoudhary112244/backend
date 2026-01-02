import { useState } from "react";
import api from "../api/axios";

const Register = () => {
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");

  const register = async () => {
    await api.post("/auth/register", user);
    setMsg("Registered. Verify OTPs");
  };

  return (
    <div className="p-6">
      <input placeholder="Email" onChange={e => setUser({...user,email:e.target.value})}/>
      <input placeholder="Phone" onChange={e => setUser({...user,phone:e.target.value})}/>
      <input placeholder="Username" onChange={e => setUser({...user,username:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={e => setUser({...user,password:e.target.value})}/>
      <button onClick={register}>Register</button>
      <p>{msg}</p>
    </div>
  );
};

export default Register;
