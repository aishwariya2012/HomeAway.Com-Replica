import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

import {Redirect} from 'react-router';
import TravellerHeader from '../Headers/TravellerHeader';
import {connect} from 'react-redux';


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
        this.imageClick=this.imageClick.bind(this);
        this.SearchChangeHandler=this.SearchChangeHandler.bind(this);
        this.StartChangeHandler=this.StartChangeHandler.bind(this);
        this.EndChangeHandler=this.EndChangeHandler.bind(this);
        this.BedChangeHandler=this.BedChangeHandler.bind(this);
        this.price=this.price.bind(this);
        this.SearchFill=this.SearchFill.bind(this);

      
       
    }
   
    componentWillMount(){
        this.props.handleflag();
        var i;
      
    this.setState({
        properties1:this.state.properties1.concat(this.props.properties)
    })
    
   
       this.props.properties.map(async property=>{
           
           i= property.ImageName.split(',');
                     console.log(i[0]);
         const response= await   axios.post('http://localhost:3001/download/'+i[0]);
                      
                            console.log("Imgae Res : ",response);
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                         this.setState({imageView: this.state.imageView.concat(imagePreview)  });
                        

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

imageClick(e) {
    console.log(e);
    const data={
   id:e
    }
   this.props.getProperty(data);

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
        const {  currentPage, propertiesPerPage,imageView } = this.state;
        
        

        const indexOfLastTodo = currentPage * propertiesPerPage;
        const indexOfFirstTodo = indexOfLastTodo - propertiesPerPage;
        const currentProperties = this.props.properties.slice(indexOfFirstTodo, indexOfLastTodo);
        const imageView1=imageView.slice(indexOfFirstTodo, indexOfLastTodo);
 
        let redirectVar = null;
        if(this.props.getflag===true){
            redirectVar = <Redirect to= "/Details"/>
        }
        
        var i=-1;
        let details = currentProperties.map(property => {
            console.log(property.ImageName)
            i=i+1;
                return (
                
            <div class="backclm">
           
            <div class="mar">
            <div class="border2">
            <div class="row">
            <img class="images"  onClick={this.imageClick.bind(this,property._id)} src={imageView1[i]}/> 
            <div class="h">    
              <h3> {property.Headline}</h3>
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
            for (let i = 1; i <= Math.ceil(this.props.properties.length / propertiesPerPage); i++) {
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
                {redirectVar}
            <div >
            <TravellerHeader></TravellerHeader>
            </div>
        
       <div class="row">

       <p class="p1">       You Searched For:</p>
       <br></br>
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
                
            <div class="mainpage">
            {redirectVar}
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
const mapStateToProps = state => { 
    console.log("Traveller",state);
    return {
     Parameter:state.Property.updatedList.SearchParameter,
     properties:state.Property.updatedList.Properties,
     getflag:state.getProperty
       
    }
}
const mapDispatchStateToProps = dispatch => {
   
      return {
          onSubmitHandle : (data) => {
        
          },
          handleflag:()=>{
              dispatch({type:'handle'})
          },
         filter:(data)=>
        {
            
           console.log(data);
           axios.post('http://localhost:3001/filter', data)
           .then((response) => {
              console.log("response data",response.data);
               
               dispatch({type: 'Searchfil',payload : response.data,statusCode : response.status})
             
       });
      },
      getProperty:(data)=>
      {
          console.log(data);
          dispatch({type: 'getproperty',payload : data,statusCode : 200})
      }
  }}

export default connect(mapStateToProps,mapDispatchStateToProps)(travellerdashboard); 