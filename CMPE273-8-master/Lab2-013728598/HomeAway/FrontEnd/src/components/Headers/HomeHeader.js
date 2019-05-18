import React, {Component} from 'react';

import {Link} from 'react-router-dom';

import cookie from 'react-cookies';
import {connect} from 'react-redux';

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

        
        var display1 =this.props.name
        return(
            
            <div class="container">
             <div class="navbar navbar-inverse">
                     <div class="logo">
                             <a>< Link to="/"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></ Link></a>
                    </div>
                             
                   <div class="navbar1">
                   <a > <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></a>
                   
                                   
                  <ul   >
                      <li class="nav-link"><Link to="/TravellerBoard">TripBoards</Link></li>
                              
                     <li class="nav-link">Help</li>
                        
                        <li class="nav-item dropdown">
                             <a class="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                              {display1}
                             </a>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" ><Link class="blue" to="/EditProfile">Profile</Link></a>
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

const mapStateToProps = state => { 
    console.log(state); 
   
    return {
     name:state.user[0].FirstName
    }
}
export default connect(mapStateToProps)(Header);