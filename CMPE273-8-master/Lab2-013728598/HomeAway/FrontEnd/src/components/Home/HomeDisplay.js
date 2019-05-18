import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import cookie from 'react-cookies';
import 'react-day-picker/lib/style.css';
import {Link} from 'react-router-dom';
import HomeHeader from '../Headers/HomeHeader'
import { push } from 'react-router-redux';

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
            
          

        }
        this.SearchChangeHandler=this.SearchChangeHandler.bind(this);
        this.StartChangeHandler=this.StartChangeHandler.bind(this);
        this.EndChangeHandler=this.EndChangeHandler.bind(this);
        this.GuestChangeHandler=this.GuestChangeHandler.bind(this);
        this.submit=this.submit.bind(this);

 
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
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/HomeDisplay',data)
        //     .then(response => {
        //         console.log(response.data.length);
        //         console.log(response.data[0].ImageNames);

        //         var i=response.data[0].ImageNames.split(',');
        //         console.log(i[1]);
        //         if(response.status === 200){
        //             this.setState({
        //                 authFlag: true,
                        
        //             })

                    
        //         }else{
        //             this.setState({
        //                 authFlag: false
        //             })
        //         }
        //     });
        this.props.onSubmitHandle(data);

 }

    render(){
    let redirect=null
        if(this.props.Search===true){
            redirect = <Redirect to= "/TravellerSearch"/>   
        }
        if(this.props.authFlag===false){
            redirect = <Redirect to="/"/>
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

const mapStateToProps = state => { 
   
    return {
     Search:state.Search,
      authFlag:state.authFlag 
    }
}

const mapDispatchStateToProps = dispatch => {

    return {
        onSubmitHandle : (data) => {
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/HomeDisplay', data)
                .then((response) => {
                   console.log("response data",response.data);
                    if(response.data.updatedList.Properties.length==0){
         alert("No Property Available with such critertia try another City,or date");
                    }
                    else{
                    dispatch({type: 'Search',payload : response.data,statusCode : response.status})
                    }
            });
        }
    }
}
export default connect(mapStateToProps,mapDispatchStateToProps)(Home); 