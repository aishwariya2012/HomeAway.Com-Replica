import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';


class calculator extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
          
            display:'0',
            authFlag : false
        }
 
    }
    componentDidMount(){
        // axios.get('http://localhost:3001/calculator')
        //         .then((response) => {
        //         //update the state with the response data
        //         console.log(response.data);
        //         this.setState({
        //             display : response.data
                    
        //         });
        //         alert(this.state.display);
        //     });
    }

    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }

    clear=(e)=>
    {
        console.log("You clicked Cleared");
        this.setState({
            display:'0'
        })
    }
    display=(e)=>
    {
       if (this.state.display==='0')
       { this.setState(
            {
                display:e.target.value
            }
        )
        }
        else{
            this.setState(
                {
                    display:this.state.display+e.target.value
                } )
        }
    }
    
    
    submitLogin = (e) => {
        console.log("You Requested Evalution for problem ");
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        //const value = e.target.value;
        const data = {
            
            display:this.state.display
          
        }
        console.log("Data Sent : ", data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/calculator',data)
            .then(response => {
                console.log("Status Code : ",response.data);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        display: response.data.ans
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }

    render(){
       
       const {display}=this.state;
        return(
            <div>
               
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Calculator</h2>
                
                        </div>
                        
                        <div class="calculator">
                         <div class="calculator-display">{display}</div></div>
                         <div className="button-row">
 
                        <button  onClick={this.display} type='action' value="+"  class="btn btn-pri">+</button> 
                        <button  onClick={this.display} type='action' value="-" class="btn btn-pri">-</button>
                        <button  onClick={this.display} type='action' value="/" class="btn btn-pri">/</button> 
                        <button  onClick={this.display} type='action' value="*" class="btn btn-pri">*</button>
                         </div>
                        <div className="button-row">
 
 <button  onClick={this.display} type='action' value="1"  class="btn btn-pri">1</button> 
 <button  onClick={this.display} type='action' value="2" class="btn btn-pri">2</button>
 <button  onClick={this.display} type='action' value="3" class="btn btn-pri">3</button> 
 
 <button  onClick={this.display} type='action' value="4" class="btn btn-pri">4</button> 
 

  </div>
  <div className="button-row">
 
 <button  onClick={this.display} type='action' value="5"  class="btn btn-pri">5</button> 
 <button  onClick={this.display} type='action' value="6" class="btn btn-pri">6</button>
 <button  onClick={this.display} type='action' value="7" class="btn btn-pri">7</button> 
 
 <button  onClick={this.display} type='action' value="8" class="btn btn-pri">8</button> 
 

  </div>

<div className="button-row">
 
 <button  onClick={this.display} type='action' value="9"  class="btn btn-pri">9</button> 
 <button  onClick={this.display} type='action' value="0" class="btn btn-pri">0</button>
 <button  onClick={this.clear} type='action'  class="btn btn-pri">Clear</button> 
 <button  onClick={this.submitLogin} type='action' class="btn btn-pri">=</button>
  </div>

                         
                        
                                  
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default calculator;