import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import Header2 from '../Headers/OwnerHeader';
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
        console.log(this.props.Userinfo)
        const data={
            username:this.props.username,
            Stay:this.state.Stay,
            Rate:this.state.Rate,
            Currency:this.state.value,
         
            Address1:this.props.Userinfo[0].Address1,
            Address2:this.props.Userinfo[0].Address2,
            City:this.props.Userinfo[0].City,
            Country:this.props.Userinfo[0].Country,
            Zip:this.props.Userinfo[0].Zip,
            HeadLine:this.props.Userinfo[1].HeadLine,
            Description:this.props.Userinfo[1].Description,
            PropertyType:this.props.Userinfo[1].PropertyType,
            BedRoom:this.props.Userinfo[1].BedRoom,
            BathRoom:this.props.Userinfo[1].BathRoom,
            Accomodates:this.props.Userinfo[1].Accomodates,
            ImageName:this.props.Userinfo[2].ImageName,
            StartDate:this.props.Userinfo[3].StartDate,
            EndDate:this.props.Userinfo[3].EndDate
        }
        console.log(this.props.Userinfo);
       
     
    this.props.onSubmitHandle(data)
 }
    render(){
        let redirect = null
        
        if(this.props.Submit===true){
            redirect = <Redirect to= "/OwnerDash"/>   
        }
        return(
            <div>
                  {redirect}  <div>
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

const mapStateToProps = state => { 
    console.log("Value of Final",state);
    return {
   Userinfo:state.Property,
   Submit:state.SubmitProperty,
   username:state.user[0].UserName
       
    }
}
const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle : (data) => {
            console.log("data",data)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/RentalRates', data)
                .then((response) => {
                    console.log("response data",response.data);
                    
                    dispatch({type: 'RentalRates',payload :response.data.updatedList,statusCode : response.status})
                   
            });
        }
    }
}
//export Login Component
export default connect(mapStateToProps,mapDispatchStateToProps)(ListProperty); 