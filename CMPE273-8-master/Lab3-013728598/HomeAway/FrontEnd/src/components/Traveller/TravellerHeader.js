import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';


 export default class TravellerHeader extends Component{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
          
            display:'0',
            authFlag : false
        }
 
    }
    handleLogout = () => {
        cookie.setRawCookie('new',"ok",{ path: '/' });
        cookie.remove('cookie', { path: '/' });
        
        
    }
  
    render(){

        
        var display1 =cookie.load('cookie');
        return(
            
            <div class="container">
             <div class="navbar navbar-inverse">
                     <div class="logo">
                             <a class="blue" href="/"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></a>
                    </div>
                             
                   <div class="navbar1">
                   <a > <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img></a>
                   
                                   
                  <ul   >
                      <li class="nav-link"><a class="blue" href="/TravellerBoard">TripBoards</a></li>
                              
                     <li class="nav-link"><a class="blue" href="#">Help</a></li>
                        
                        <li class="nav-item dropdown blue">
                             <a class="nav-link dropdown-toggle blue"  id="navbardrop" data-toggle="dropdown">
                               {display1}
                             </a>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" href="/EditProfile">Profile</a>
                                <a class="dropdown-item" onClick={this.handleLogout} href="/">LogOut</a>
                                            
                                            </div>
                                            </li>
                                    </ul>
                                  
                                    
                                      
                                  
                             
                       </div>
                </div>
                       
               
                </div>
        )
    }
}

