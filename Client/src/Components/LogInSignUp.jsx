import React, { useState } from 'react';
import '../Styles/LogInSignUp.css';
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'
import user_icon from '../assets/person.png'
import phone_icon from '../assets/phone.png'
import DisplayCard from './DisplayCard';
export default function LogInSignUp(){
    //Page type
    const [pageType, setPageType]= useState("Sign Up");
    const handleClick=(accessType)=> {
        setPageType(accessType);
    }
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [loginDetails, setLoginDetails] = useState({ phone: '', password: '' });
    const [signupDetails, setSignupDetails] = useState({ phone: '', password: '' });
      // Handle login form input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  // Handle signup form input changes
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value });
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginDetails.username && loginDetails.password) {
      // Simple validation
      setIsLoggedIn(true); // Show the dashboard
    } else {
      alert('Please provide complete login details');
    }
  };

  // Handle signup form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupDetails.username && signupDetails.password) {
      // Simple validation
      setIsSignedUp(true); // Show signup success message
    } else {
      alert('Please provide complete signup details');
    }
  };
    return (
        <div className='container'>
            {!isLoggedIn && !isSignedUp && (
                <>
                    <div className="header">
                <div className="text">{pageType}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {pageType==="Log In" ? <div></div>: 
                    <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text"  placeholder='Enter Your Name' required/>
                    </div>
                }
                {pageType==="Log In" ? <div></div>: 
                    <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Enter Your email' required/>
                    </div>
                }
                
                <div className="input">
                    <img src={phone_icon} alt="" />
                    <input type="tel" placeholder='Enter Your phone number' name='phone' pattern="[0-9]{10}" value={(pageType==="Log In") ? loginDetails.phone: signupDetails.phone} onChange={(pageType==="Log In") ? handleLoginChange:handleSignupChange} required/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Enter Password' name='password' value={(pageType==="Log In") ? loginDetails.password : signupDetails.password} onChange={(pageType==="Log In") ? handleLoginChange:handleSignupChange}  required/>
                </div>
                {pageType==="Log In" ? <div></div>: 
                    <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='confirm password' required/>
                    </div>
                }
                
            </div>
            {pageType==="Sign Up" ? <div></div> : <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
            
            <div className="submit-container">
                <div className={pageType==="Log In" ? "submit grey" : "submit"} onClick={()=>handleClick("Sign Up")}>Sign Up</div>
                <div className={pageType==="Sign Up" ? "submit grey" : "submit"} onClick={()=>handleClick("Log In")}>Log In</div>
            </div>
                </>
            )}
            
            {isLoggedIn && <DisplayCard />}
            {isSignedUp && <DisplayCard />}
        </div>
    );
};