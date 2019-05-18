import React, {Component} from 'react';

import image from '../PostSignUp/Profile.png'
import './App.css';

 export default class PostSignUp extends Component{
   
  
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
     
          this.state={
              property:[],
          }
          
        }
        componentDidMount(){


        }

    render(){
        const{property}=this.state.property;
        return(

          
            <div class="backclm">
              hello
              <div class="mar">
          <div class="border1">
              <div class="row">
              
              <img class="images" src = {image}/> 
          <div class="h">    
                <h3> Foundry Commons</h3>
                <div class="row">
                <p>2br</p>
                <p>2bath</p>
                <p>$320</p>
                
                </div>
                <p>San Jose</p>
               
</div>
</div>
            </div>
                  
                  
                  </div>
                    </div>         
                   
              
                      
        )
    }
}

 