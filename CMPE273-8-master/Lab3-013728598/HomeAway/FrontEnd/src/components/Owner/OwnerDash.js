import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import Header2 from '../Headers/OwnerHeader';

import { graphql, compose, withApollo } from 'react-apollo';
import { OwnerProperties } from '../../queries/queries';
//Define a Login Component
 class OwnerDash extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            properties : [],
            imageView: [],
            currentPage: 1,
            filterstartdate:" ",
            filterenddate:" ",
            propertiesPerPage: 5,
        }
        this.handleClick = this.handleClick.bind(this);
        this.filterstartdateChangeHandler = this.filterstartdateChangeHandler.bind(this);
        this.filterenddateChangeHandler = this.filterenddateChangeHandler.bind(this);
        this.filter1=this.filter1.bind(this);
    }
    filterstartdateChangeHandler(event){
        this.setState({
            filterstartdate : event.target.value
        })
    }

    filterenddateChangeHandler(event){
        this.setState({
            filterenddate : event.target.value
        })
    }
    setStateAsync(state) {
        return new Promise(resolve => {
          this.setState(state, resolve);
        });
      }
      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
      filter1(event){
          event.preventDefault();
          var i;
const data={
    filterenddate:this.state.filterenddate,
    filterstartdate:this.state.filterstartdate,
    username:this.props.username
}
  
          
          axios.post('http://localhost:3001/Filter1',data)
          .then(async (response) => {
              console.log(response.data);
              
              if(response.data.updatedList.length==0){
                  alert("No Property listed in Such Criteria");
          
              }
              else{
          this.setState({
              properties : response.data.updatedList
          });
          this.state.properties.map (property =>
              {
                 
                 console.log(property.ImageName);
                 i=property.ImageName.split(',');
                  console.log(i[0]);
        axios.post('http://localhost:3001/download/'+i[0])
                  .then(response => {
                      console.log("Imgae Res : ",response);
                      let imagePreview = 'data:image/jpg;base64, ' + response.data;
                      this.setStateAsync({imageView: this.state.imageView.concat(imagePreview)  });
                  });
              })
  
      }
         
                  
          });
     
      }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.props.client.query({
            query : OwnerProperties,
            variables: {
             UserName:localStorage.getItem("username")
                       
                   }
        }).then(res=>{
            console.log("Data",res)
            console.log("Data",res.data.TravellerTrip)
            this.setState({
                properties:this.state.properties.concat(res.data.OwnerProperties)
            })
        });
    //     var properties,i;
    //     var data={
    //         username:this.props.username
            
    //     }
    //     console.log(data);
    //   axios.post('http://localhost:3001/OwnerProperty',data)
    //     .then(async (response) => {
    //         console.log(response.data);
            
    //         if(response.data.updatedList.length==0){
    //             alert("you have nt listed any property!!! Please ClickTo HomeAway");
        
    //         }
    //         else{
    //     this.setState({
    //         properties : this.state.properties.concat(response.data.updatedList) 
    //     });
    //     this.state.properties.map (property =>
    //         {
               
    //            console.log(property.ImageName);
    //            i=property.ImageName.split(',');
    //             console.log(i[0]);
    //   axios.post('http://localhost:3001/download/'+i[0])
    //             .then(response => {
    //                 console.log("Imgae Res : ",response);
    //                 let imagePreview = 'data:image/jpg;base64, ' + response.data;
    //                 this.setStateAsync({imageView: this.state.imageView.concat(imagePreview)  });
    //             });
    //         })

    // }
       
                
    //     });
        
    //     console.log(properties);
    
    }

    render()
    {
        const {  currentPage, propertiesPerPage,imageView ,properties} = this.state;
        
        

        const indexOfLastTodo = currentPage * propertiesPerPage;
        const indexOfFirstTodo = indexOfLastTodo - propertiesPerPage;
        const currentProperties = properties.slice(indexOfFirstTodo, indexOfLastTodo);
        const imageView1=imageView.slice(indexOfFirstTodo, indexOfLastTodo);
        var i=-1;
        let details = currentProperties.map(property => {
            i=i+1;
                return (
                    
            <div class="backclm">
            <div class="mar">
            <div class="border2">
            <div class="row">
            {/* <img class="images"   src={imageView1[i]}/>  */}
            <div class="h">    
            <h3> {property.Headline}</h3>
              <div class="row">
              <p> {property.BedRoom} BedRoom |</p>
              <p>{property.BathRoom} BathRooms|</p>
              <p>Accomodates {property.Accomodates}|</p>
              <p>$ {property.RentalRates}</p>
              
              </div>
              <p>{property.City}</p>
              <p>{property.PropertyListedBy}</p>
              
             
</div>
</div>
          </div>
                
                
                </div>
                </div>
                       
                 
              
                )
            })
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(properties.length / propertiesPerPage); i++) {
              pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                return (
                   
                  <li class="fontcolor"
                    key={number}
                    id={number}
                    onClick={this.handleClick}>
                    {number}
                    &nbsp;
                  </li>
               
                  
                );
              });
        
        
            return(       
                <div >
                    
                    <div >
                  <Header2></Header2>
                    </div>
                
               <div class="row">

                <div class="form-group space1">
              <input  onChange = {this.filterstartdateChangeHandler}type="date" class="form-control" name="add1" placeholder="" autofocus/>
             </div>
             <div class="form-group space1">
      <input  onChange={this.filterenddateChangeHandler}type="date" class="form-control" name="add1" placeholder="" autofocus/>
             </div>
             <div class="form-group">  
                            <button onClick = {this.filter1} class="btn btn-primary btndesign space">Filter</button>
                            </div>
                            <br></br>
        
              
              
                    
               </div>
                        
               <p class="p1">      Properties You Listed:</p>
               <div class="mainpage">
            
               {details}
               <div class="pagenumber">
            <div class="pagination">
            <ul>
            <li class="fontcolor">&laquo;</li>
            {renderPageNumbers}   
            
            <li class="fontcolor">&raquo;</li>
                  </ul>
                  </div>
            </div>
            
            </div>
            </div>
        
            
                    
                )
            }
        }


export default compose(
    graphql(OwnerProperties, { name: "OwnerProperties" }),
   
    )
    (withApollo(OwnerDash))