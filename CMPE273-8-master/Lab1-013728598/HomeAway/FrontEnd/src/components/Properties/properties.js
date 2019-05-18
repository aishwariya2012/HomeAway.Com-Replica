import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import Header from '../Header';
import "../../App1.css";
import Header2 from '../Header2';


export default class properties extends Component{
   
    constructor(props){
        super(props);
        this.state={
        Address1:"",
        Address2:"",
        City:"",
        Country:"",
        Zip:""
        
        }
        this.AddressLine1ChangeHandler = this.AddressLine1ChangeHandler.bind(this);
        this.AddressLine2ChangeHandler = this.AddressLine2ChangeHandler.bind(this);
        this.CityChangeHandler = this.CityChangeHandler.bind(this);
        this.CountryChangeHandler = this.CountryChangeHandler.bind(this);
        this.ZipChangeHandler = this.ZipChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        
    }
    AddressLine1ChangeHandler = (e) => {
        this.setState({
            Address1 : e.target.value
        })
    }
    AddressLine2ChangeHandler = (e) => {
        this.setState({
            Address2 : e.target.value
        })
    }
    CountryChangeHandler = (e) => {
        this.setState({
            Country: e.target.value
        })
    }
    CityChangeHandler = (e) => {
        this.setState({
            City : e.target.value
        })
    }
    ZipChangeHandler = (e) => {
        this.setState({
            Zip : e.target.value
        })
    }
    submitLogin = (e) => {
        e.preventDefault();
        console.log("clicked");
        const data = {
            Address1 : this.state.Address1,
            Address2 : this.state.Address2,
            City:this.state.City,
            Country:this.state.Country,
            Zip:this.state.Zip
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/properties',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        inserted:true
                       
                    })
                    window.location.href="http://localhost:3000/ListDetails";
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
     
       
 }

    render(){
       
        return(
            <div>
                    <div >
                            <Header2></Header2>
                    </div >
                    <div>
                    <div class="outer row">
                                <div class="sidenav">
                                <ui class="new ">
                                <li > <a >Welcome</a></li>
                                    <li > <a ><b>Location</b></a></li>
                                    <li > <a >Details</a></li>
                                    <li > <a >Booking Options</a></li>
                                    <li > <a >Photos</a></li>
                                    <li > <a >Security</a></li>
                                    <li > <a >Payments</a></li>
                                    <li > <a >Pricing</a>
                                    <div class="innersidebar">
                    <a >Availbiity</a>
                    <a >Rental Rates</a>
                    <a >Taxes</a>
                    <a >Fees</a>    
                </div>
                                    </li>
                                   
                                    </ui>
                                </div>  

            <div>
                                                                    <div class="location">
                                                                    <div class="login-form1">
                                                                    <div class="main-location">
                                                                        <div class="panel1">
                                                                            <h2>Address</h2>
                                                                        </div>
                                                                        
                                                                            <div class="form-group">
                                                                                <input onChange = {this.AddressLine1ChangeHandler} type="text" class="form-control" name="add1" placeholder="Address Line 1" autofocus/>
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <input onChange = {this.AddressLine2ChangeHandler} type="text" class="form-control" name="add2" placeholder="Address Line 2"/>
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <input type="text" onChange = {this.CityChangeHandler} class="form-control" name="city" placeholder="Enter City"/>
                                                                            </div>

                                                                            <div class="row loc">
                                                                                <div class="col-md-6">
                                                                                    <input type="text" onChange = {this.CountryChangeHandler} class="form-control" name="country" placeholder="Enter Country"/>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <input type="text" onChange = {this.ZipChangeHandler} class="form-control" name="postalcode" placeholder="Enter Zip Code"/>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                            <button class="btn btn-primary btndesign2">Back</button>
                                                                            <button onClick = {this.submitLogin} class="btn btn-primary btndesign1">Next</button>
                                                                            </div>
                                                                        
                                                                        </div>
                                                                       </div>
                                                                </div></div>
                                                                </div>
                                                                </div>
                                                                </div>

      
        )
    }
}
