import React, {Component} from 'react';
import '../../App.css';
import '../../App2.css';
import axios from 'axios';
import Header2 from '../../../src/Header2';

import {Redirect} from 'react-router';

//Define a Login Component
export default class Login extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false
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
                console.log("Status Code owner: ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
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
        //redirect based on successful login
         let redirectVar = null;
         if(this.state.authFlag){
             redirectVar = <Redirect to= "/OwnerDash"/>
         }
        return(        
     <div>
          <div class="x">
          {redirectVar}
        <Header2></Header2>
             </div>
            
            <div class="ownerbackclr ">
           
            <div class=" hidden-xs bgimage">
            <a id="personyzeContent"></a>
            <div class="login-form">
                    <div class="main-divowner">
                        <div class="panel">
                            <h2>Owner Login</h2>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control1" name="username" placeholder="Email Address" autofocus/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control1" name="password" placeholder="Password"/>
                            </div>
                            <div class="forgot a">
                            <span id="forgotpassword">
                                <a class="a1" href="#">Forgot Password?</a>
                            </span>
                            </div>
                            <div>
                            <button onClick = {this.submitLogin} class="btn btn-primary btndesign">Log In</button>
                            </div>
                            <div class="checkDIV">
                                <input class="rememberme" checked="true" type="checkbox" name="signedin" value="signedin" />Keep Me signed in
                            </div>
                            <br/>
                            <br/>
                            <hr></hr>
                    </div>         
                    </div>
               </div>
               </div>
               </div>
            
                
                
       
            
        )
    }
}
