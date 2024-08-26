import React, { BaseSyntheticEvent,useState } from "react";
import axios from 'axios';
import "./Forgotpass.css"; 
const SignInSignUp = () => {
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" , cpassword:""});
  const [errors, setErrors] = useState('');
  const handleSignUpClick = () => {
    
  };
  const validateSignUp = (e: BaseSyntheticEvent) => {
    if ((!signUpData.name)||(!signUpData.password) || (!signUpData.email)||(!signUpData.cpassword)) {
      setErrors("All fields are mandatory!!");
      alert("All fields are mandatory!!")
      return false;  
    } 
    else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      setErrors("Invalid email");
     alert("Invalid email")
      return false;
    }
    else if((signUpData.password)&&(signUpData.password.length < 8)){
      setErrors("Password too short");
      alert("password too short")
      return false;
    }
    else if((signUpData.cpassword)!=(signUpData.password)){
      setErrors("Password does not match");
      alert("password does not match")
      return false;
    }
    return true;
  };

  const handleSignUpSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (validateSignUp(e)) {
      console.log("Sign Up Data:", signUpData);
    }
  };
 
  const handleSignupApi =() =>{
    const nameParts = signUpData.name.split(" ");
    const first_name = nameParts[0];
    const last_name = nameParts[1] || ""; 

    console.log("Sign Up Data:", signUpData);
    axios.post("http://localhost:8000/user/signup",{
      email : signUpData.email ,
      first_name :first_name,
      last_name : last_name,
      password: signUpData.password
      

    }).then(result=>{
      console.log(result)
    })
    .catch(error=>{
      console.log(error)
    })

  };


  return (
    <div className={"container right-panel-active"}>
      <div className="sign-up-container">
        <form onSubmit={handleSignUpSubmit}>
          <h1>Reset Password</h1>
          <input type="text" placeholder="Name" value={signUpData.name}
            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })} />            
          <input type="email" placeholder="Email" value={signUpData.email}
            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} />   
          <input type="password" placeholder=" New Password" value={signUpData.password}
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}/>
            <input type="password" placeholder="Confirm Password" value={signUpData.cpassword}
            onChange={(e) => setSignUpData({ ...signUpData, cpassword: e.target.value })}/>
            <button onClick={handleSignupApi}>Reset</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-left">
          <img src='./src/assets/logo3.png' alt="Logo" className="logo" /> 
          </div>
          <div className="overlay-right">
            <button className="ghost-button" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
