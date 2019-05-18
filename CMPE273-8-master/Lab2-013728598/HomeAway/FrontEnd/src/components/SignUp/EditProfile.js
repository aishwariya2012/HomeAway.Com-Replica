import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import  cookie from 'react-cookies';
import '../../App.css';
import TravellerHeader from '../Headers/TravellerHeader';
import ProfilePicture from'./ProfilePicture';
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css'
class EditProfile extends Component{
    constructor(props){
        super(props);
      
        this.state = {
            firstname:this.props.name,
            lastname:'',
            AboutMe:'',
            City:'',
            Company:'',
            School:'',
            HomeTown:'',
            Language:'',
            value:''}; 
        this.handleChange = this.handleChange.bind(this);
        this.LastNameChangeHandler=this.LastNameChangeHandler.bind(this);
        this.FirstNameChangeHandler=this.FirstNameChangeHandler.bind(this);
        this.AboutMeChangeHandler=this.AboutMeChangeHandler.bind(this);
        this.CityChangeHandler=this.CityChangeHandler.bind(this);
        this.CompanyChangeHandler=this.CompanyChangeHandler.bind(this);
        this.HomeTownChangeHandler=this.HomeTownChangeHandler.bind(this);
        this.LanguageChangeHandler=this.LanguageChangeHandler.bind(this);
        this.SchoolChangeHandler=this.SchoolChangeHandler.bind(this);
    }
    handleChange(event) {
        
        this.setState({value: event.target.value});
    }
    LastNameChangeHandler(event) {
        
        this.setState({lastname: event.target.value});
    }
    FirstNameChangeHandler(event) {
        
        this.setState({firstname: event.target.value});
    }
    AboutMeChangeHandler(event) {
        
        this.setState({AboutMe: event.target.value});
    }
    CityChangeHandler(event) {
        
        this.setState({City: event.target.value});
    }
    CompanyChangeHandler(event) {
        
        this.setState({Company: event.target.value});
    }
    HomeTownChangeHandler(event) {
        
        this.setState({HomeTown: event.target.value});
    }
    LanguageChangeHandler(event) {
        
        this.setState({Language: event.target.value});
    }
    SchoolChangeHandler(event){
        this.setState({School: event.target.value});
    }

    componentDidMount(){
        
        const data={
            firstname:this.props.name
        }
        axios.post('http://localhost:3001/display1',data)
                .then((response) => {
                    console.log("Response data",response.data.updatedList);
                this.setState({

                     firstname:response.data.updatedList.FirstName,
                    lastname:response.data.updatedList.LastName,
                     City:response.data.updatedList.City,
                     AboutMe:response.data.updatedList.AboutMe,
                     School:response.data.updatedList.School,
                    
                     Company:response.data.updatedList.Company,
                    
                     HomeTown:response.data.updatedList.HomeTown,
                     Language:response.data.updatedList.Languages,
                     value:response.data.updatedList.Gender

                  
                });
         
               
               
            }); 
          //  this.props.GetInfo(data);
            
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
           firstname:this.state.firstname,
           earlier: cookie.load('cookieU'),
           lastname:this.state.lastname,
           AboutMe:this.state.AboutMe,
           City:this.state.City,
           Company:this.state.Company,
           School:this.state.School,
           HomeTown:this.state.HomeTown,
           Language:this.state.Language,
           Gender:this.state.value

        }
      
        console.log("data",data);
     
       
 this.props.onSubmitHandle(data); 
        
    }


    render(){
        let redirect = null
        console.log("authflag is"+this.props.authFlag);
        if(this.props.Edited===true){
        redirect = <Redirect to= "/Login"/>   
        }
        
     return(
     
           <div>
               {redirect}
               <div >
             <TravellerHeader></TravellerHeader>
             </div>
            <div class="backclear">
            <div class="profilepic">
           <ProfilePicture border-radius={"50%"} height={"150px"} width ={"150px"}></ProfilePicture>
           </div>
            <div class="Inside">
            {this.state.firstname}
            <div class="main-div1">
            Profile Information
            <div class="form-group space">
              <input onChange = {this.FirstNameChangeHandler}  value={this.state.firstname}   type="text" class="form-control" name="add1" placeholder="First" autofocus></input>
             </div>
             <div class="form-group space">
              <input onChange = {this.LastNameChangeHandler} value={this.state.lastname} type="text" class="form-control" name="add1"  autofocus/>
             </div>
             <div class="form-group space">
              <input onChange = {this.AboutMeChangeHandler} value={this.state.AboutMe} type="textarea" class="form-control2" name="add1" placeholder=" About Me" autofocus/>
             </div>
             <div class="form-group space">
              <input onChange = {this.CityChangeHandler} value={this.state.City} type="text" class="form-control" name="add1" placeholder="My City,Country"  autofocus/>
             </div>
             <div class="form-group space">
              <input onChange = {this.CompanyChangeHandler} value={this.state.Company} type="text" class="form-control" name="add1" placeholder="Company" autofocus/>
             </div>
             <div class="form-group space">
              <input onChange = {this.SchoolChangeHandler} value={this.state.School} type="text" class="form-control" name="add1" placeholder="School" autofocus/>
              
             </div>
             <div class="form-group space">
              <input onChange = {this.HomeTownChangeHandler} value={this.state.HomeTown}type="text" class="form-control" name="add1" placeholder="HomeTown" autofocus/>
              
             </div>
             <div class="form-group space">
              <input onChange = {this.LanguageChangeHandler} value={this.state.Language}type="text" class="form-control" name="add1" placeholder="Language" autofocus/>
             </div>
             <div class="form-group"><div>
                                <select  id="rates-onboarding-currencyCode" value={this.state.value} onChange={this.handleChange} class="form-control currency-select">
                                <option value="">Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                </select>
                                
                                </div>
                                </div>
                                <button onClick = {this.submitLogin} class="btn btn-primary btndesign">Save Changes</button>
            </div>
            </div>
            </div>
            </div>
            
        )
    }
}
const mapStateToProps = state => { 
    console.log("Response",state);
    return {
      Edited:state.Edited,
      authFlag:state.authFlag,
      name:state.user[0].FirstName
       
    }
}
const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle : (data) => {
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/EditProfile', data)
                .then((response) => {
                    console.log("response data",response.data.updatedList);
                    dispatch({type: 'EditProfile',statusCode : response.status})
            });
        },
    //    GetInfo :(data)=>{
    //          axios.post('http://localhost:3001/display1',data)
    //              .then((response) => {
                
    //                 console.log("response data",response.data.updatedList);
    //                 dispatch({type: 'GetInfo',payload : response.data.updatedList,statusCode : response.status})

               
    //      });

    //     }
    }
}
//export Login Component
export default connect(mapStateToProps,mapDispatchStateToProps)(EditProfile); 
