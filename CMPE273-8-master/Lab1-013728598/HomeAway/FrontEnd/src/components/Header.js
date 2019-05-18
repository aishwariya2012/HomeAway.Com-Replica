import React, {Component} from 'react';



class Header extends Component{
    
  
    render(){
       
        return(
            <div class="container">
             <div class="navbar navbar-inverse">
                     <div class="logo">
                             <a href="/"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></a>
                    </div>
                             
                   <div class="navbar1">
                   <a > <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></a>
                   <ul class="text">
                  <li><a class="list btn btn-default btn-inverse" href="#" >List your property</a></li>
                  </ul>
                                   
                  <ul   >
                      <li class="nav-link" ><a href="#">TripBoards</a></li>
                              
                     <li class="nav-link"><a href="#">Help</a></li>
                        
                        <li class="nav-item dropdown">
                             <a class="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                                 Login
                             </a>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" href="/OwnerLogin">Owners Login</a>
                                <a class="dropdown-item" href="/traveller">Travelers Login</a>
                                            
                                            </div>
                                            </li>
                                    </ul>
                                  
                                    
                                      
                                  
                             
                       </div>
                </div>
                       
               
                </div>
        )
    }
}

export default Header;