import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';

import 'react-day-picker/lib/style.css';

import HomeHeader from './HomeHeader';


class Home extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
          
            Search:'',
            Start:'',
            End:'',
            Guest:'',
            Property:[],
            test: "neha",

            authFlag : false
        }
        this.SearchChangeHandler=this.SearchChangeHandler.bind(this);
        this.StartChangeHandler=this.StartChangeHandler.bind(this);
        this.EndChangeHandler=this.EndChangeHandler.bind(this);
        this.GuestChangeHandler=this.GuestChangeHandler.bind(this);
        this.submit=this.submit.bind(this);

 
    }
    
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    SearchChangeHandler = (e) => {
        this.setState({
            Search: e.target.value
        })
    }
    StartChangeHandler = (e) => {
        this.setState({
            Start : e.target.value
        })
    }
    EndChangeHandler = (e) => {
        this.setState({
            End : e.target.value
        })
    }
    GuestChangeHandler = (e) => {
        this.setState({
            Guest : e.target.value
        })
    }


   
    
    submit= (e) => {
       
        e.preventDefault();
        const data = {
            Search : this.state.Search,
            Start : this.state.Start,
            End : this.state.End,
            Guest : this.state.Guest,
            
        }
        console.log('clicked');
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/HomeDisplay',data)
            .then(response => {
                console.log(response.data.length);
                console.log(response.data[0].ImageNames);

                var i=response.data[0].ImageNames.split(',');
                console.log(i[1]);
                if(response.status === 200){
                    this.setState({
                        authFlag: true,
                        
                    })

                    
                }else{
                    this.setState({
                        authFlag: false
                    })
                }
            });
 }

    render(){
        let redirect = null;
      
        if(this.state.authFlag){
         redirect = <Redirect to={{
             pathname:'/TravellerSearch',
             state: {key:this.state.test}
         }}  />
       }
      
        return(
           
          <div class="body1"> 
           {redirect}
           <div class="white">
               <HomeHeader></HomeHeader>
               </div>
                <div class="main">
                      <div class="main-inner">
                         <div class="main-content">
                            <h1 class="content">
                            <span >Book beach houses, cabins,</span>
                            <br></br>
                            <span >condos and more, worldwide</span>
                            </h1>
                   
                            <div>
                            <form  action={this.submit}>
                          
                            <input type="text" class="input" required onChange= {this.SearchChangeHandler}  placeholder="Where do you want to go?"></input>
                            <input type="date" class="input1" required onChange= {this.StartChangeHandler}placeholder="Arrival"></input>
                            <input type="date" class="input1"  required onChange= {this.EndChangeHandler}placeholder="Depart">
                        
                            </input>
                            <input type="text" class="input2" required onChange= {this.GuestChangeHandler}placeholder="Guest"></input>
                            <button class="btn1 btn-primary btn-lg"onClick={this.submit} >Search</button>
                            </form>
                                </div>
                
                        

                   
                                       
                </div>
                <div>
                    
                </div>
                    
                </div> 
             </div>
            
        
        </div>
        
        )
    
            
          
               
    
        
    }
}

export default Home;