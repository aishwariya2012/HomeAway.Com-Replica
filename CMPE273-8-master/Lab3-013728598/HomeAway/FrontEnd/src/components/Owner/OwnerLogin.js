import React, {Component} from 'react';
import '../../App.css';
import '../../App2.css';
import axios from 'axios';
import Header2 from '../Headers/Header2';

import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import { graphql, compose, withApollo } from 'react-apollo';
import { loginUser } from '../../queries/queries';
//import { login } from '../../mutation/mutations';

//Define a Login Component
 class Login extends Component
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
                     alert("Login Success");
                     localStorage.setItem("username",res.data.loginUser.UserName);
                     window.location.href="/OwnerDash"
                 }
             }); 
         
         }

    render()
    {
        //redirect based on successful login
         let redirectVar = null;
         if(this.props.authFlag){
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
                                <input onChange = {this.usernameChangeHandler} type="email" class="form-control1" name="username" placeholder="Email Address" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" autofocus/>
       
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
                            <div >
                    <h4>
                        <span>Need an account? </span>
                        <a class="a1" href="/SignUpEmailOwner">Sign Up</a>
                        </h4>
                        
                    </div>
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
                    dispatch({type: 'OwnerLOGIN',payload : response.data,statusCode : response.status})}

            });
        }
    }
}
//export Login Component
export default compose(graphql(loginUser, { name: "loginUser" }),connect(mapStateToProps,mapDispatchStateToProps))(withApollo(Login));
