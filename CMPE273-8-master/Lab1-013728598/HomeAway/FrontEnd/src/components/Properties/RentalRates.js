import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

import Header2 from '../Header2';
import "../../App1.css";
import cookie from 'react-cookies'


class ListProperty extends Component{
   
    constructor(props){
        super(props);
        this.state={
        value:'',
        Rate:'',
        Stay:'',
        USername:''
        }
this.NightlyBaseRateChangeHandler=this.NightlyBaseRateChangeHandler.bind(this);
this.MinimumStayChangeHandler=this.MinimumStayChangeHandler.bind(this);
this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event) {
        
        this.setState({value: event.target.value});
    }
    NightlyBaseRateChangeHandler= (e) => {
        this.setState({
            Rate: e.target.value
        })}
   MinimumStayChangeHandler= (e) => {
    this.setState({
        Stay: e.target.value
    })}
    submitLogin = (e) => {
        e.preventDefault();
        const data={
            Stay:this.state.Stay,
            Rate:this.state.Rate,
            Currency:this.state.value,
            USername:cookie.load('cookieU')
        }
        console.log("clicked");
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/RentalRates',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        inserted:true
                       
                    })
                    window.location.href="http://localhost:3000/OwnerDash";
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
                    <div>
                            <Header2></Header2>
                    </div >
                    <div>
                    <div class="outer row">
                                <div class="sidenav">
                                <ui class="new ">
                                    <li > <a >Welcome</a></li>
                                    <li > <a  >Location</a></li>
                                    <li > <a >Details</a></li>
                                    <li > <a >Booking Options</a></li>
                                    <li > <a >Photos</a></li>
                                    <li > <a >Security</a></li>
                                    <li > <a >Payments</a></li>
                                    <li > <a ><b>Pricing</b></a>
                                    <div class="innersidebar">
                    <a >Availbility</a>
                    <a ><b>Rental Rates</b></a>
                    <a >Taxes</a>
                    <a>Fees</a>    
                </div>
                                    </li>
                                   
                                    </ui>
                                </div>   
                            

                <div>

                <div class="location">
                     <div class="login-form1">
                         <div class="main-location">
                            <div>
                                <div class="checklist-header-container ">
                                <h3><span>How Much Do You Want To Charge?</span></h3>
                                <hr></hr>
                                </div>
                              <div>
                           
                            <form role="form">
                            <div >
                             <div  class="Line">   <span>We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</span>
                               </div>
                                <hr></hr>
                            </div>
                            <article class="onboarding-page-item Line">
                            <div class="form-inline onboarding-inline-row">
                            <div class="form-group1 form-group-label">
                            <label class="control-label currency-select-label" for="rates-onboarding-currencyCode">Currency</label>
                            </div>
                            <div class="form-group1"><div>
                                <select value={this.state.value} onChange={this.handleChange} id="rates-onboarding-currencyCode" class="form-control currency-select">
                                <option value=""></option>
                                <option value="AUD">Australian Dollar (AUD)</option>
                                <option value="SGD">Singapore Dollar (SGD)</option>
                                <option value="JPY">Japanese Yen (JPY)</option>
                                <option value="EUR">Euros (EUR)</option>
                                <option value="GBP">Great British Pound (GBP)</option>
                                <option value="USD">US Dollar (USD)</option>
                                <option value="CAD">Canadian Dollar (CAD)</option>
                                <option value="NZD">New Zealand Dollar (NZD)</option>
                                <option value="BRL">Brazil Real (BRL)</option></select>
                                
                                </div></div></div></article>
                                <hr></hr>
                                <article class="onboarding-page-item Line">
                            <div class="form-inline onboarding-inline-row">
                            <div class="form-group1 form-group-label">
                            <label class="control-label currency-select-label" for="rates-onboarding-currencyCode">Nightly Base Rate</label>
                            </div>
                            <div class="form-group1"><div>
                            <input  onChange={this.NightlyBaseRateChangeHandler} type="text" class="form-control" maxlength="10" >
                               </input> 
                               
                              </div></div></div>
                              <br></br>
                              <div class="form-inline onboarding-inline-row">
                              <div class="form-group1 form-group-label">
                            <label class="control-label currency-select-label" for="rates-onboarding-currencyCode">Minimum Stay</label>
                            </div>
                            <div class="form-group1"><div>
                            <input  onChange={this.MinimumStayChangeHandler}class=" login-group1 form-control" id="sleeps" name="sleeps" type="number" max="500" min="1" step="1" />
                            
                               </div></div></div>
                    
                              </article>                                              
                                </form><hr></hr>
                                <div class="row item">
                                <button onClick = {this.submitLogin} class="btn btn-primary btndesign1">Submit</button>
                                </div>
                            </div>
                        </div>
                     </div>
         </div>
 </div>
 </div>
</div>
</div>          
</div>
       
        )
    }
}

export default ListProperty;