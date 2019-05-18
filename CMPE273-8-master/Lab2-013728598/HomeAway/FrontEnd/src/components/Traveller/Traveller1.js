import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import '../../App.css';
import '../../App2.css';

import Header2 from '../Headers/Header2';

//import Header2 from '../../Header2';

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
    
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        cookie.setRawCookie('new',"ok",{ path: '/' });
        cookie.remove('cookie', { path: '/' });
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
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
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        this.props.onSubmitHandle(data);
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
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/Traveller', data)
                .then((response) => {
                    console.log("response data",response.data);
                    if(response.data==null){
alert("In valid Credentials,either username or password not valid or Not Authorised user");
                    }
                    else{
                    dispatch({type: 'LOGIN',payload : response.data,statusCode : response.status})}

            });
        }
    }
}
//export Login Component
export default connect(mapStateToProps,mapDispatchStateToProps)(Traveller1); 