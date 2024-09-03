import React, { BaseSyntheticEvent,useState } from "react";
import axios from 'axios';
import "./Login.css"; 
import { Link, Outlet, useNavigate } from "react-router-dom";
  const SignInSignUp = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUpData, setSignUpData] = useState({ name: "", email: "", phone:"", password: "" , cpassword:""});
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState('');
  const navigate = useNavigate()
  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };
  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const validateSignUp = (e: BaseSyntheticEvent) => {
    if ((!signUpData.name)||(!signUpData.password) || (!signUpData.email)||(!signUpData.cpassword)||(!signUpData.phone)) {
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
    else if((signUpData.phone)&&(signUpData.phone.length != 10)){
      setErrors("Enter valid phone number");
      alert("Enter valid phone number")
      return false;
    }
    return true;
  };

  const validateSignIn = (e: BaseSyntheticEvent) => {
    if ((!signInData.password) || (!signInData.email)) {
      setErrors("All fields are mandatory!!");
      alert("All fields are mandatory!!")
      return false;
    }
    else if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      setErrors("Invalid email");
      alert("Invalid email")
      return false;
    }
    else if (signInData.password.length < 8){
      setErrors("Password too short");
      alert("Password too short")
      return false;
    }
  };

  const handleSignUpSubmit = (e: React.BaseSyntheticEvent<object, any, any>) => {
    e.preventDefault();
    if (validateSignUp(e)) {
      console.log("Sign Up Data:", signUpData);
    }
  };
  const handleSignInSubmit = (e: React.BaseSyntheticEvent<object, any, any>) => {
    e.preventDefault();
    if (validateSignIn(e)) {
      setSignInData(e.target.value)
      console.log("Sign In Data:", signInData);
    }
  };
  const handleLoginApi =() =>{
    console.log("Sign In Data:", signInData);
    axios.post("http://localhost:8000/user/login",{
      email : signInData.email ,
      password:signInData.password

    }).then(result => {
      console.log("Result", result.data);
      const { isAdmin } = result.data; 
      console.log(isAdmin) 
      
  
      if (isAdmin) {
        navigate('/admindashboard');
      } else {
        navigate('/home');
      }
    })
    .catch(error=>{
      console.log(error)
    })

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
      phone_no: signUpData.phone,
      password: signUpData.password,
     
      

    }).then(result=>{
      console.log(result)
    })
    .catch(error=>{
      console.log(error)
    })

  };


  return (
    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
      <div className="sign-up-container">
        <form onSubmit={handleSignUpSubmit}>
          <h1>New User</h1>
          <input type="text" placeholder="Name" value={signUpData.name}
            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })} />            
          <input type="email" placeholder="Email" value={signUpData.email}
            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} />
            <input type="phone" placeholder="Phone" value={signUpData.phone}
            onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}/>
          <input type="password" placeholder="Password" value={signUpData.password}
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}/>
            <input type="password" placeholder="Confirm Password" value={signUpData.cpassword}
            onChange={(e) => setSignUpData({ ...signUpData, cpassword: e.target.value })}/>
            
            <button onClick={handleSignupApi}>Sign Up</button>
        </form>
      </div>

      <div className="sign-in-container">
        <form onSubmit={handleSignInSubmit}>
          <h1>Login</h1>
          <input type="email" placeholder="Enter Email" value={signInData.email}
            onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}/>
          <input type="password" placeholder="Enter Password" value={signInData.password}
            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}/>
              <Link to='/forgotpass' ><p className="forgotpassword">Forgot Password?</p> </Link>
              <button onClick={handleLoginApi}>Login</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-left">
          <img src='./src/assets/logo3.png' alt="Logo" className="logo" />
            <button className="ghost-button" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="overlay-right">
          <img src='./src/assets/logo3.png' alt="Logo1" className="logo1" />
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
