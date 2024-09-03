import React, { useState } from "react";
import axios from 'axios';
import "./Forgotpass.css"; 
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [formData, setFormData] = useState({ email: "", password: "", cpassword: "" });
  const [errors, setErrors] = useState('');
  const navigate = useNavigate()

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.cpassword) {
      setErrors("All fields are mandatory!!");
      alert("All fields are mandatory!!")
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors("Invalid email");
      return false;
    } else if (formData.password.length < 8) {
      setErrors("Password too short");
      return false;
    } else if (formData.password !== formData.cpassword) {
      setErrors("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (validateForm()) {
      axios.patch("http://localhost:8000/user/reset_password", {
        email: formData.email,
        password: formData.password,
      })
        .then(result => {
          console.log(result);
          alert("Password reset successfully!");
          navigate("/");
        })
        .catch(error => {
          console.log(error);
          setErrors("Failed to reset password. Please try again.");
        });
    }
  };

  return (
    <div className={"container right-panel-active"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <input type="email" placeholder="Email"value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input type="password" placeholder="New Password" value={formData.password} 
             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <input type="password" placeholder="Confirm Password" value={formData.cpassword}
              onChange={(e) => setFormData({ ...formData, cpassword: e.target.value })}
          />
          <button type="submit">Reset</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-left">
            <img src='./src/assets/logo3.png' alt="Logo" className="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
