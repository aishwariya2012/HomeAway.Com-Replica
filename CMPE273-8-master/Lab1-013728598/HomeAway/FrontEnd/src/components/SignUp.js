import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {browserHistory} from 'react-router';
import Header2 from '../Header2';
//Define a Login Component
class SignUp extends Component
{
   
    render()
    {
        //redirect based on successful login
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
        
        return(        
        <div >
  <div class="x">
       <Header2></Header2>
             </div>
            <div class="signupbackclr">
                <div class="loginheader">
                    <h1 class="loginhome">Sign Up for HomeAway </h1>
                    <div class>
                    <h4>
                        <span>Already have an account? </span>
                        <a class="a1" href="/traveller">Log in</a>
                        </h4>
                        
                    </div>
                </div>
                <div class="login-form">
                    <div class="main-divsignup">
                            <div>
                          <a href="/SignUpEmail"><button  class="btn btn-primarysignup btndesign">Sign Up with Email</button></a>
                            </div>
                            <div class="hr-sect"><em>or</em></div>
                            <button class="loginBtn loginBtnsignup--facebook">
                            Login with Facebook
                            </button>
                            <button class="loginBtn loginBtnsignup--google">
                            Login with Google
                            </button>
                            <div class="footer-label" >
                            <small>We don't post anything without your permission.</small>
                            </div>
                            <div class="text-center">
                        <label class="footer-label">By creating an account you are accepting our <a class="a1"href="http://www.homeaway.com/info/about-us/legal/terms-conditions" target="_blank">Terms and Conditions</a> and <a href="http://www.homeaway.com/info/about-us/legal/privacy-policy" class="a1" target="_blank">Privacy Policy</a>.</label>
            </div>
                    </div>         
                    </div>
                </div>
            </div>
            
        )
    }
}
//export Login Component
export default SignUp;