import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import cookie from 'react-cookies';


class Header extends Component{
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

        
        var display1 =localStorage.getItem("username");
        return(
            
            <div class="container">
             <div class="navbar navbar-inverse">
                     <div class="logo">
                             <a ><Link to="/OwnerDash"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></Link></a>
                    </div>
                             
                   <div class="navbar1">
                   <a > <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img></a>
                   <ul class="text">
                  <li><a class="list btn btn-default btn-inverse" ><Link class="blue" to="/listprop" >List your property</Link></a></li>
                  </ul>
                                   
                  <ul   >
                  <li class="nav-item dropdown blue">
                             <a class="nav-link dropdown-toggle blue"  id="navbardrop" data-toggle="dropdown">
                                 OwnerPropertyBoard
                             </a>
                              <div class="dropdown-menu">
                                <a class="dropdown-item "><Link class="blue"to="/OwnerDash">Owners Property Listed</Link></a>
                                <a class="dropdown-item" ><Link class="blue" to="/Ownerpropertybooked">Properties Booked</Link></a>
                              </div></li>
                     <li class="nav-link blue "><a class="blue">Help</a></li>
                        
                        <li class="nav-item dropdown blue">
                             <a class="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                               {display1}
                             </a>
                              <div class="dropdown-menu">
                              <a class="dropdown-item" ><Link class="blue" to="/Inbox">Inbox</Link></a>
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


export default (Header);