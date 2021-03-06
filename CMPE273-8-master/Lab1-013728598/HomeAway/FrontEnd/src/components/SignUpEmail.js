import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Header2 from '../Header2';

//Define a Login Component
class SignUpEmail extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : "",
            lastname:"",
            email:"",
            password : "",
            inserted : false,
            authFlag:false
        }
        //Bind the handlers to this class
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            inserted : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    firstnameChangeHandler = (e) => {
        this.setState({
            firstname : e.target.value
        })
    }

    lastnameChangeHandler = (e) => {
        this.setState({
            lastname : e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        console.log("Clicked");
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username:this.state.email,
            password : this.state.password,
            firstname:this.state.firstname,
            lastname:this.state.lastname
        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/SignUpEmail',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        inserted:true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }
        
       
    

    render()
    {
        let redirect = null;
        if(this.state.inserted){
            redirect = <Redirect to= "/Post"/>
        }
       
        return(        
        <div >
        {redirect}
          <div class="x">

         <Header2></Header2>
          </div>
            
            <div class="innersignupbackclr">
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
                    <div class="main-divinnersignup">
                        <div class="row">
                        
                            
                            <input type="text" class="form-control" name="fname" placeholder="First Name" onChange={this.firstnameChangeHandler}/>
                           
                            
                           
                            <input type="text" class="form-control" name="lname" placeholder="Last Name" 
                            onChange={this.lastnameChangeHandler}/>
                           
                        </div>
                        <br/>
                        <div>
                        <input id="emailAddress" name="emailAddress" class="form-control1 input-lg" placeholder="Email address" type="email" onChange={this.emailChangeHandler}/>
                        </div>
                        <br/>
                        <div class="form-group">
                            <input id="password" name="password" class="form-control1 input-lg" onChange={this.passwordChangeHandler}  placeholder="Password" type="password" />
                        </div>
                        <br/>
                            <div>
                            <button onClick = {this.submitLogin} class="btn btn-primarysignup btndesign">Sign Up with Me</button>
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
                        <label class="footer-label">By creating an account you are accepting our <a class="a1" href="http://www.homeaway.com/info/about-us/legal/terms-conditions" target="_blank">Terms and Conditions</a> and <a class="a1" href="http://www.homeaway.com/info/about-us/legal/privacy-policy" target="_blank">Privacy Policy</a>.</label>
            </div>
                    </div>         
                    </div>
                </div>
            </div>
            
        )
    }
}
//export Login Component
export default SignUpEmail;