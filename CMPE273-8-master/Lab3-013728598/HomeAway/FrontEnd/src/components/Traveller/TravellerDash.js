import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

import {Redirect} from 'react-router';
import TravellerHeader from '../Headers/TravellerHeader';

import image from './Profile.png'
import { graphql, compose, withApollo } from 'react-apollo';
import { search } from '../../queries/queries';

class travellerdashboard extends Component
{
    
    constructor(props)
    {
       
        super(props);
      
        this.state = {
            properties1 : [],
            imageView: [],
            currentPage: 1,
            propertiesPerPage: 10,
            filter:false,
            Search:'',
            Start:'',
            End:'',
            Price:"",
            Bedroom:""

            
        }
        this.handleClick = this.handleClick.bind(this);
        this.propertyClick=this.propertyClick.bind(this);
        this.SearchChangeHandler=this.SearchChangeHandler.bind(this);
        this.StartChangeHandler=this.StartChangeHandler.bind(this);
        this.EndChangeHandler=this.EndChangeHandler.bind(this);
        this.BedChangeHandler=this.BedChangeHandler.bind(this);
        this.price=this.price.bind(this);
        this.SearchFill=this.SearchFill.bind(this);

      
       
    }
   
    componentWillMount(){
//   console.log(localStorage.getItem("ListofData"));
//   var item=[];
//   item=localStorage.getItem("ListofData");
//     item.map(properties=>{
//         console.log(properties);
//     })



console.log(this.props.location.state.detail);
console.log(localStorage.getItem("City"));

this.props.client.query({
    query : search,
    variables: {
        City: "San Jose",
          Start : this.state.Start,
          End : this.state.End,
          Accomodates : this.state.Guest,
               
           }
}).then(res=>{
    console.log("Data",res)
    console.log("Data",res.data.search)
    this.setState({
        properties1:this.state.properties1.concat(res.data.search)
    })
});

    //     this.props.handleflag();
    //     var i;
      
    
    
   
    //    this.props.properties.map(async property=>{
           
    //        i= property.ImageName.split(',');
    //                  console.log(i[0]);
    //      const response= await   axios.post('http://localhost:3001/download/'+i[0]);
                      
    //                         console.log("Imgae Res : ",response);
    //                         let imagePreview = 'data:image/jpg;base64, ' + response.data;
    //                      this.setState({imageView: this.state.imageView.concat(imagePreview)  });
                        

    //    })
       
   
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
    BedChangeHandler=(e) => {
        this.setState({
            Bedroom:e.target.value
        })
    }
    price=(e) => {
        this.setState({
            Price: e.target.value
        })
    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

propertyClick(e) {
    console.log(e);
    const data={
   id:e
    }
    this.props.history.push({
        pathname: '/Details',
        
        state: { detail: e }

      })

  }  
   SearchFill()
  {
    

    var data={
      
          Search:this.state.Search,
          Start:this.state.Start,
        End:this.state.End,
          BedRoom:this.state.Bedroom,
          RentalRates:this.state.Price

      };
     
 
   
    this.props.filter(data);


      
  }

    render()
    {
        const {  currentPage, propertiesPerPage} = this.state;
        
        

        const indexOfLastTodo = currentPage * propertiesPerPage;
        const indexOfFirstTodo = indexOfLastTodo - propertiesPerPage;
        const currentProperties = this.state.properties1.slice(indexOfFirstTodo, indexOfLastTodo);
    
 
        // let redirectVar = null;
        // if(this.props.getflag===true){
        //     redirectVar = <Redirect to= "/Details"/>
        // }
        
        var i=-1;
        let details = currentProperties.map(property => {
            console.log(property.ImageName)
            i=i+1;
                return (
                
            <div class="backclm">
           
            <div class="mar">
            <div class="border2">
            <div class="row">
            <img class="images"   src={image}/> 
            <div class="h">    
              <h3   onClick={this.propertyClick.bind(this,property.Headline)}> {property.Headline }</h3>
              <div class="row">
              <p> {property.BedRoom} BedRoom |</p>
              <p>{property.BathRoom} BathRooms|</p>
              <p>Accomodates {property.Accomodates}|</p>
              <p>$ {property.RentalRates}</p>
              
              </div>
              <p>{property.City}</p>
              
             
            </div>
            </div>
            </div>
                
                
                </div>
                </div>
                       
                 
              
                )
            })
         
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.properties1.length / propertiesPerPage); i++) {
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
                {/* {redirectVar} */}
            <div >
            <TravellerHeader></TravellerHeader>
            </div>
        
       <div class="row">

       <p class="p1">       Your Searched Property:</p>
       {/* <br></br>
       <div class="form-group space1">
           Place: <input  onChange = {this.SearchChangeHandler} type="text" class="form-control" name="add1" placeholder="" autofocus/>
             </div>
             
             <div class="form-group space1">
            Start Date  <input  onChange = {this.StartChangeHandler} type="date" class="form-control" name="add1" placeholder="" autofocus/>
             </div>
             <div class="form-group space1">
            End Date:  <input  onChange={this.EndChangeHandler} type="date" class="form-control" name="add1" placeholder="" autofocus/>
             </div>
           
             <div class="form-group space1">
           Price: <input  onChange = {this.price}type="text" class="form-control" name="add1" placeholder="" autofocus/>
             </div>
             <div class="form-group space1">
             BedRoom: <input onChange={this.BedChangeHandler} type="text" class="form-control" name="add1"  autofocus/>
             </div>
             <div class="form-group">  
                            <button onClick = {this.SearchFill} class="btn btn-primary btndesign space">Filter</button>
                            </div>
                            


             
            
       </div>
                 */}
                 </div>
            <div class="mainpage">
            {/* {redirectVar} */}
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
 //export default (travellerdashboard); 
 export default compose(graphql(search, { name: "search" }))
 (withApollo(travellerdashboard));