import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {connect} from 'react-redux';

  class TravellerHeader extends Component{
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

        
        var display1 =this.props.name;
        return(
            
            <div class="container">
             <div class="navbar navbar-inverse">
                     <div class="logo">
                             <a class="blue">< Link to="/"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></ Link></a>
                    </div>
                             
                   <div class="navbar1">
                   <a > <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img></a>
                   
                                   
                  <ul   >
                      <li class="nav-link"><a class="blue" href="/TravellerBoard">TripBoards</a></li>
                              
                     <li class="nav-link "><a href="" class="blue" >Help</a></li>
                        
                        <li class="nav-item dropdown blue">
                             <a class="nav-link dropdown-toggle blue"  id="navbardrop" data-toggle="dropdown">
                               {display1}
                             </a>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" ><Link class="blue" to='/EditProfile'>Profile</Link></a>
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
export default connect(mapStateToProps)(TravellerHeader);