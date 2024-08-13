import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
const Register= () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        let formIsValid = true;
        const newErrors = { name: '', email: '', password: '' };

        if (name.trim() === '') {
            formIsValid = false;
            newErrors.name = 'Name is required';
        }

        if (email.trim() === '') {
            formIsValid = false;
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            formIsValid = false;
            newErrors.email = 'Invalid email format';
        }

        if (password.trim() === '') {
            formIsValid = false;
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            formIsValid = false;
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);

        if (formIsValid) {
            alert('Registration Successful!');
        }
    };
      return(
          <>
          <div className="login">
              <div className="loginBox">
                  <div className="header">Register</div>
                  <form onSubmit={handleSubmit}>
                      <div className="inputs">
                          <input className="name" placeholder="Enter Your Name" value={name}
                                onChange={(e) => setName(e.target.value)}/>
                                {errors.name && <span className="error">{errors.name}</span>}

                          <input className="name" placeholder="Enter Your Email Id" value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                            {errors.email && <span className="error">{errors.email}</span>}

                          <input className="password" placeholder="Enter Your Password" type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                            {errors.password && <span className="error">{errors.password}</span>}

                      </div>
                      <div style={{display:"flex", justifyContent: "center"}}>
                          <button className="submit" type="submit">Submit</button>
                      </div>
                  </form>             
              </div>
          </div>  
          </>
      );
      };
      export default Register;