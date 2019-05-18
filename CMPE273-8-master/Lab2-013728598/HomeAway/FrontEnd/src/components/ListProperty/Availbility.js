import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import Header2 from '../Headers/OwnerHeader';
import "../../App1.css";


class ListProperty extends Component{
   
    constructor(props){
        super(props);
        this.state={
        Start:'',
        End:''
        }
this.StartChangeHandler=this.StartChangeHandler.bind(this);
this.EndChangeHandler=this.EndChangeHandler.bind(this);
    }
    StartChangeHandler= (e) => {
        this.setState({
            Start: e.target.value
        })
    }
    EndChangeHandler   = (e) => {
        this.setState({
            End: e.target.value
        })
    }
    
    submitLogin = (e) => {
        e.preventDefault();
        console.log("clicked");
        const data={
            Start:this.state.Start,
            End:this.state.End

        }
        // axios.defaults.withCredentials = true;

        // //make a post request with the user data
        // axios.post('http://localhost:3001/Availbility',data)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             this.setState({
        //                 authFlag : true,
        //                 inserted:true
                       
        //             })
        //             window.location.href="http://localhost:3000/RentalRates";
        //         }else{
        //             this.setState({
        //                 authFlag : false
        //             })
        //         }
        //     });
        this.props.onSubmitHandle(data);
       
 }
    render(){
        let redirect = null
        
        if(this.props.Availibility===true){
            redirect = <Redirect to= "/RentalRates"/>   
        }
        return(
            <div>
                {redirect}
                    <div >
                            <Header2></Header2>
                    </div >
                    <div>
                    <div class="outer row">
                                <div class="sidenav">
                                <ui class="new ">
                                    <li > <a >Welcome</a></li>
                                    <li > <a >Location</a></li>
                                    <li > <a >Details</a></li>
                                    <li > <a >Booking Options</a></li>
                                    <li > <a >Photos</a></li>
                                    <li > <a >Security</a></li>
                                    <li > <a >Payments</a></li>
                                    <li > <a ><b>Pricing</b></a>
                                    <div class="innersidebar">
                    <a class="active" ><b>Availbility</b></a>
                    <a >Rental Rates</a>
                    <a >Taxes</a>
                    <a>Fees</a>    
                </div>
                                    </li>
                                   
                                    </ui>
                                </div>   
                            

                <div>

                <div class="location">
             
            <div class="headerinfo">
            <h5 class="headertagh">Select a starting point for setting up your availability</h5>
            </div>
            <div class="login-form1">
            <div class="main-availability">
                <div class="panel">
                    <h6>Enter Dates</h6>
                </div>
                
                    <div class="form-group">
                     Start Date:   <input onChange = {this.StartChangeHandler} type="date" class="form-control dateclass placeholderclass" name="startdate" placeholder="Start Date" autofocus/>
                    </div>
                    <div class="form-group">
                     End Date:   <input onChange = {this.EndChangeHandler} type="date" class="form-control dateclass placeholderclass" name="enddate" placeholder="End Date"/>
                    </div>
                    <div class="row">
                                                                            <button  class="btn btn-primary btndesign2">Back</button>
                                                                            <button onClick = {this.submitLogin} class="btn btn-primary btndesign1">Next</button>
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
    console.log("Value of Detail",state);
    return {
   Availibility:state.Availibility
       
    }
}
const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle : (data) => {
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/Availbility', data)
                .then((response) => {
                    console.log("response data",response.data);
                    
                    dispatch({type: 'Availibility',payload :response.data.updatedList,statusCode : response.status})
                   
            });
        }
    }
}
//export Login Component
export default connect(mapStateToProps,mapDispatchStateToProps)(ListProperty); 