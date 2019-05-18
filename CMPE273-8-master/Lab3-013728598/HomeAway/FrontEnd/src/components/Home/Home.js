import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import 'react-day-picker/lib/style.css';
import Header from '../Headers/Header';
import {Redirect} from 'react-router';

class Home extends Component{

  
    
   
    
    submitLogin = (e) => {
       
        e.preventDefault();
 }


    render(){
        let redirectVar = null;
        if(this.props.authFlag===true){
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
const mapStateToProps = state => { 
   
    return {
     Search:state.Search,
      authFlag:state.authFlag 
    }
}


export default connect(mapStateToProps)(Home); 