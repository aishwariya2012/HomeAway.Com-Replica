import React, {Component} from 'react';

import "../../App1.css";
import Header2 from '../Header2';


class ListProperty extends Component{
   
    constructor(props){
        super(props);
        this.state={
        render:"",
        }

    }
    
    submitLogin = (e) => {
        e.preventDefault();
        console.log("clicked");
        window.location.href="http://localhost:3000/properties";
       
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
                                    <li > <a ><b>Welcome</b></a></li>
                                    <li > <a>Location</a></li>
                                    <li > <a>Details</a></li>
                                    <li > <a >Booking Options</a></li>
                                    <li > <a >Photos</a></li>
                                    <li > <a >Security</a></li>
                                    <li > <a >Payments</a></li>
                                    <li > <a >Pricing</a>
                                    <div class="innersidebar">
                    <a >Availbility</a>
                    <a>Rental Rates</a>
                    <a >Taxes</a>
                    <a>Fees</a>    
                </div>
                                    </li>
                                   
                                    </ui>
                                </div>   
                            

                <div>
                <div class="location1">
                
                <h4>Welcome! Verify the location of your rental</h4>
              <h2>Just 7 Steps Remaining</h2>

                    <div>
                    <button onClick = {this.submitLogin} class="btn btn-primary btndesign">Continue</button>
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