import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import '../../App.css';
import '../../App2.css';
import Header2 from '../../Header2';
class Traveller extends Component{
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
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/Traveller',data)
            .then(response => {
                console.log("Status Code : ",response);
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


    render(){
        let redirect = null;
        if(this.state.inserted){
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
                                <input class="form-control1" onChange = {this.usernameChangeHandler} type="text" name="username" placeholder="Email Address" autofocus/>
                            </div>
                            <div class="form-group">
                                <input class="form-control1" onChange = {this.passwordChangeHandler} type="password" name="password" placeholder="Password"/>
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

export default Traveller;