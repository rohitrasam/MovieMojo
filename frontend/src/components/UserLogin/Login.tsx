import React, { useState } from 'react';
import './Login.css';

const App: React.FC = () => {
  const [signIn, toggle] = useState(true);

  return (
    <div className="container">
      <div className={`sign-up-container ${!signIn ? 'active' : ''}`}>
        <form>
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Sign Up</button>
        </form>
      </div>

      <div className={`sign-in-container ${signIn ? 'active' : ''}`}>
        <form>
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button type="button">Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className={`overlay-panel left ${signIn ? 'active' : ''}`}>
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost-button" onClick={() => toggle(true)}>
              Sign In
            </button>
          </div>
          <div className={`overlay-panel right ${!signIn ? 'active' : ''}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost-button" onClick={() => toggle(false)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
