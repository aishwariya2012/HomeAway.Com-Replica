import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import Header2 from '../Headers/OwnerHeader';
//Define a Login Component
class image extends Component
{
    constructor(props){
        super(props);
        this.state = {
          description: '',
          selectedFile: [],
          imageView : [],
          flag:false
          
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.submitLogin=this.submitLogin.bind(this);
      }
    onChange = (e) => {
   
        if(e.target.name == 'selectedFile'){
          
            var join= this.state.selectedFile.concat(...e.target.files);
            console.log(join);
            this.setState({
              selectedFile:join
            });
            
          
        }else{
          this.setState({ [e.target.name]: e.target.value,flag:false });
        }
        }
       
         
      
    
      onSubmit = (e) => {
        e.preventDefault();
        const { description, selectedFile} = this.state;
       var name1='';
        
        let formData = new FormData();
    for(let size=0;size<selectedFile.length;size++){
        
        formData.append('selectedFile', selectedFile[size]);
        console.log(this.state.selectedFile[size].name);
        if(name1=='')
        {
            name1=this.state.selectedFile[size].name;
        }
        else{
        name1=name1+','+this.state.selectedFile[size].name ;
        }
        console.log(name1);
       
    }
    formData.append('description', name1);
    
    console.log("image",formData);
        axios.post('http://localhost:3001/', formData)
            .then((result) => {
              // access results...
            });
           
    
      }
submitLogin = (e) => {
    e.preventDefault();
  

    this.props.onSubmitHandle();
 
  }
    render()
    {
       
        let redirect = null
        
        if(this.props.ImageInsert===true){
            redirect = <Redirect to= "/Avail"/>   
        }
        const { description, selectedFile ,flag} = this.state;
let images=null
        var i=-1
        if(flag===true)
     {
        
        images= this.state.selectedFile.map(propp =>{
         i=i+1
         console.log(i);
         return(
            <img class="images"   src={this.state.imageView[i]}/> 
     )})
     }
            return(
                <div>
                    {redirect}
                        <div >
                                <Header2></Header2>
                        </div >
                        <div>
                        <div class="outer row">
                                    <div class="sidenav">
                                    <ui class="new ">
                                        <li > <a >Welcome</a></li>
                                        <li > <a  >Location</a></li>
                                        <li > <a >Details</a></li>
                                        <li > <a >Booking Options</a></li>
                                        <li > <a class="active" href="/Photos"><b>Photos</b></a></li>
                                        <li > <a >Security</a></li>
                                        <li > <a >Payments</a></li>
                                        <li > <a >Pricing</a>
                                        <div class="innersidebar">
                        <a  >Availbility</a>
                        <a>Rental Rates</a>
                        <a >Taxes</a>
                        <a>Fees</a>    
                    </div>
                                        </li>
                                       
                                        </ui>
                                    </div>   
                                
    
                    <div>
    
                    <div class="location">
                 
                <div class="headerinfo">
                <h5 class="headertagh">Select Your Images To Upload</h5>
                </div>
                <div class="login-form1">
                <div class="main-availability">
                    <div class="panel">
                        <h6>Upload Images upto 5 Images</h6>
                    </div>
                    <div class="form-group">
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.onChange}
              multiple
            />
            <input
              type="file"
              name="selectedFile"
              multiple
              onChange={this.onChange}
            />
            <div class="sub">
            <button type="submit">Submit</button>
            </div>
          </form>
        </div>
                        <div class="row">
                                                                                <button  class="btn btn-primary btndesign2">Back</button>
                                                                          <button onClick = {this.submitLogin} class="btn btn-primary btndesign1">Next</button>
                                                                                </div>
                                                                                <div>{images}</div>
                    
                       
                </div>
                </div>
            </div>
            </div>
            </div>
                    
                   </div>
                </div>
            
            )
        }
    }
    const mapStateToProps = state => { 
        console.log("Value of Detail",state);
        return {
       ImageInsert:state.ImageInsert
           
        }
    }
    const mapDispatchStateToProps = dispatch => {
        return {
            onSubmitHandle : (data) => {
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3001/ImageInsert', data)
                    .then((response) => {
                        console.log("response data",response.data);
                        
                        dispatch({type: 'ImageInsert',payload :response.data.updatedList,statusCode : response.status})
                       
                });
            }
        }
    }
    //export Login Component
    export default connect(mapStateToProps,mapDispatchStateToProps)(image); 
    