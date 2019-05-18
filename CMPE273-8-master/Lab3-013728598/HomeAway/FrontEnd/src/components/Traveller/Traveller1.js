import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import '../../App.css';
import '../../App2.css';
import { graphql, compose, withApollo } from 'react-apollo';
import { loginUser } from '../../queries/queries';
//import { login } from '../../mutation/mutations';

import Header2 from '../Headers/Header2';



class Traveller1 extends Component{
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            inserted:false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    
   
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
  
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
   
    submitLogin = (e) => {
   
   
   console.log(this.state.username);

         this.props.client.query({
            query : loginUser,
            variables: {
                        UserName: this.state.username,
                        Password: this.state.password, 
                   }
        }).then(res=>{
            console.log("Data",res)
            console.log("Data",res.data)
            if(res.data.loginUser == null){
                alert("Invalid");
            }
            else{
                alert("Login Successfull will be redirected to homepage");
                localStorage.setItem("username",res.data.loginUser.UserName);
                window.location.href="/homedisplay"
            }
        }); 
    
    }


    render(){
        let redirect = null
        
        if(this.props.authFlag===true){
            redirect = <Redirect to= "/HomeDisplay"/>   
        }
        
        return(
            <div>
           {redirect}
           <div class="x">
        <Header2></Header2>
             </div>
            <div>
            <div class="backclr">
                <div class="loginheader">
                    <h1 class="loginhome">Log in to HomeAway </h1>
                    <div >
                    <h4>
                        <span>Need an account? </span>
                        <a class="a1" href="/SignUp">Sign Up</a>
                        </h4>
                        
                    </div>
                </div>
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Account Login</h2>
                        </div>
                        
                            <div class="form-group">
                                <input class="form-control1" onChange = {this.usernameChangeHandler} type="email" name="username" placeholder="Email Address" required autofocus/>
                            </div>
                            <div class="form-group">
                                <input class="form-control1" onChange = {this.passwordChangeHandler} type="password" name="password" required placeholder="Password"/>
                            </div>
                            <div class="forgot a">
                            <span id="forgotpassword">
                                <a class="a1" >Forgot Password?</a>
                            </span>
                            </div>
                            <div>
                            <button onClick = {this.submitLogin} class="btn btn-primary btndesign">Login</button>
                            </div>
                            <div class="checkDIV">
                                <input class="rememberme" checked="true" type="checkbox" name="signedin" value="signedin" />Keep Me signed in
                            </div>
                            <br/>
                            <div class="hr-sect"><em>or</em></div>
                            <button class="loginBtn loginBtn--facebook">
                            Login with Facebook
                            </button>
                            <button class="loginBtn loginBtn--google">
                            Login with Google
                            </button>
                    </div>         
                    </div>
                </div> 
                        </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => { 
    console.log("Value of Authflag",state);
    return {
       authFlag:state.authFlag
       
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle : (data) => {
            console.log(data);
            dispatch({type: 'LOGIN',payload : data})
        }

    }
}
//export Login Component
export default compose(graphql(loginUser, { name: "loginUser" }),connect(mapStateToProps,mapDispatchStateToProps))(withApollo(Traveller1));
