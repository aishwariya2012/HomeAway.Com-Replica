import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import Header from '../Header';
import "../../App1.css"
export default class welcome extends Component{
    submitLogin = (e) => {
        e.preventDefault();
        console.log("clicked");
        window.location.href("http://localhost:3000/properties");
       
 }



    render()
    {
       
        return(
            
                   <div class="location1">
                
                <h4>Welcome! Verify the location of your rental</h4>
              <h2>Just 7 Steps Remaining</h2>

                    <div>
                    <button onClick = {this.submitLogin} class="btn btn-primary btndesign">Continue</button>
                    </div>
                
           
        </div>
      
        )
    }
}
