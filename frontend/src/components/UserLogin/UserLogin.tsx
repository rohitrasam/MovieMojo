const UserLogin=()=>{
return(
    <>
    <div className="login">
        <div className="loginBox">
            <div className="header">Login</div>
                <div className="inputs">
                    <input className="name" placeholder="Enter Your Name"/>
                    <input className="password" placeholder="Enter Your Password" type="password"/>
                </div>
                <a href="" className="forgotpassword">Forgot Password?</a>
                <div style={{display:"flex", justifyContent: "center"}}>
                    <button className="submit">Login</button>
                </div>
                <p>don't have an account? <a href="Register.tsx" className="registerlink">Sign Up</a></p>               
        </div>
    </div>  
    </>
);
};
export default UserLogin;