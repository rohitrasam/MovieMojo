import React, { BaseSyntheticEvent, useState } from 'react';
import axios from 'axios';
import './UserLogin.css';
const UserLogin=()=>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: BaseSyntheticEvent) => {
        if (name.trim() === '' || password.trim() === '') {
            setError('Both fields are required');
            alert(error)
            return;
        }
        setError('');
        console.log('Logging in with:', { name, password });
    };

return(
    <>
        <div className="login">
        <img src='./src/components/assets/logo3.png' alt="logo" className="logo" />
          <div className="loginBox">
            <div className="header">Login</div>
                <div className="inputs">
                    <input className="name" placeholder="Enter Your Name" value={name}
                                onChange={(e) => setName(e.target.value)}/>
                    <input className="password" placeholder="Enter Your Password" type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <a href="" className="forgotpassword">Forgot Password?</a>
                <div style={{display:"flex", justifyContent: "center"}}>
                <button className="submit" onClick={handleLogin}>Login</button>
                </div>
                <div className="registerlink">
                    <p>Don't have account ? <a href=""className="signup">Sign Up</a></p>
                </div>          
        </div>
        </div>  
    </>
);
};
export default UserLogin;