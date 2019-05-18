import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';

import 'react-day-picker/lib/style.css';
import Header from '../Header';
import {Redirect} from 'react-router';

class Home extends Component{

    constructor(props){
       
        super(props);
       
        this.state = {
          
            place:'',
            authFlag : false
        }
 
    }
   
    
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }

   
    
    submitLogin = (e) => {
       
        e.preventDefault();
 }


    render(){
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/HomeDisplay"/>
        }
        
      
      
        return(
           <div>
                {redirectVar}
          <div class="body1"> 
               <Header></Header>
                <div class="main">
                      <div class="main-inner">
                         <div class="main-content">
                            <h1 class="content">
                            <span >Welcome To Home Away </span>
                            <br></br>
                            <span > Please Login </span>
                            <br></br>
                   
                            </h1>
                        

                   
                                       
             
                </div>
               </div>
               </div>
            
        
        </div>
        </div>
        )
    
            
          
               
    
        
    }
}

export default Home;