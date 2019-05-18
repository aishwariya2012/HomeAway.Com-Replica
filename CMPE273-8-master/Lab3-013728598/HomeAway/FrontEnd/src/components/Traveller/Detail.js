import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Carousel from 'react-image-carousel';

import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import TravellerHeader from '../Headers/TravellerHeader';
import image from './Profile.png'
import { graphql, compose, withApollo } from 'react-apollo';
import { searchproperty } from '../../queries/queries';
import { addBooking } from '../../mutation/mutations';
class travellerdashboard extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            properties1 : [],
            imageView: [],
            Charge:'',
            open:false,
            Quesdecription:"",
            propertyTopic:""
            
        }
     
    }
   
    
    componentWillMount(){
        // var properties,i;
    //  
    // const data={
    //     id:this.props.id
    // }

    console.log(this.props.location.state.detail);
    this.props.client.query({
        query : searchproperty,
        variables: {
         Headline:this.props.location.state.detail
                   
               }
    }).then(res=>{
        console.log("Data",res)
        console.log("Data",res.data.searchproperty)
        this.setState({
            properties1:this.state.properties1.concat(res.data.searchproperty)
        })
    });
       
    //    axios.post('http://localhost:3001/Detail',data)
    //     .then(async (response) => {
    //         console.log(response.data);
           
    //      this.setState({
    //         properties : this.state.properties.concat(response.data.updatedList.Properties[0]),
        
            
    //     });
    //     this.state.properties.map (property =>
    //         {
               
    //             console.log(property.ImageName);
    //            i= property.ImageName.split(',');
    //             console.log(i.length);
               
                
    //          for(let size=0;size<i.length;size++){
    //              console.log(size);  
    //   axios.post('http://localhost:3001/download/'+i[size])
    //             .then(response => {
    //                 console.log("Imgae Res : ",response);
    //                 let imagePreview = 'data:image/jpg;base64, ' + response.data;
    //              this.setState({imageView: this.state.imageView.concat(imagePreview)  });
    //             });
    //         }
                
    //         })

                
    //     });
        }
        

       
        
    handlebook(e) {
        console.log(e);

        var data=this.props.addBooking({
            variables:{
           UserName:localStorage.getItem("username"),
           Headline:e
           
            }
        }).then(res=>{
            console.log("Data",res)
            console.log("Data",res.data)
            if(res.data.addBooking == null){
                alert("Sorry Was not able to book property");
            }
            else{
                alert(" booked property and will be redirected to your trip boards");
                this.props.history.push({
                    pathname: '/TravellerBoard',
                    
                    state: { detail:"ok" }
        
                  })
            }
        }); 
    //     const data={
    //             Username:,
    //             PropertyID:e,
    //             Start:this.props.Parameter.Start,
    //             End:this.props.Parameter.End
              
    //     }
    //     console.log(data);
    //             axios.post('http://localhost:3001/Book',data)
    //     .then( (response) => {
    //         if(response.status === 200){
    //             this.setState({
    //                 authFlag : true,
    //                 inserted:true
                   
    //             })
             
    //         }else{
    //             this.setState({
    //                 authFlag : false
    //             })
    //         }
    // });
  
}

   

    render()
    {
        let redirectVar = null;
        const {open}=this.state;
     
        let details2 = this.state.properties1.map(property => {
           
                return (
                    
            <div class="backclm">
            <div class="mar">
            <div class="border2">
            <div class="row">
            
       
            <div class="h">    
              <h3> {property.Headline}</h3>
              <div class="row">
              <i class="fa fa-bed"></i>
              <i class="fa fa-bath"></i>
              <i class="fa fa-male"></i>
              <i class="fa fa-moon-o" aria-hidden="true"></i>
              </div>
              <div class="row">
              <p> BedRoom: {property.BedRoom} | </p>
              <p>BathRooms: {property.BathRoom} |</p>
              <p>Sleeps: {property.Accomodates}</p>
           
              
              </div>
              <p>$ {property.RentalRates} per night </p>
            City:  <p>{property.City}</p>
            Description:<p>{property.Description}</p>


              <button onClick={() =>this.handlebook(property.Headline)}>BookNow</button>
    
                  
</div>
</div>
          </div>
                
                
                </div>
                </div>
                       
                 
              
                )
            })
            
            
   
        
        return(       
        <div >
            {redirectVar}
            <div >
          <TravellerHeader></TravellerHeader>
            </div>
        
       <div class="row">

       <p class="p1">       You Clicked This property to view:</p>
       <br></br>
        
             
             
            
       </div>
                
            <div class="mainpage">
              
               {details2}
            </div>
        </div>
            
        )
    }
}
// const mapStateToProps = state => { 
//     console.log("Traveller",state);
//     return {
//      Parameter:state.Property.updatedList.SearchParameter,
//      properties:state.Property.updatedList.Properties,
//      getflag:state.getProperty,
//      id:state.id.id,
//      name:state.user[0].UserName
       
//     }
// }
//export Login Component

//export default (travellerdashboard);
// export default compose(
//     graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
//     graphql(addBookMutation, { name: "addBookMutation" })
// )(AddBook); 
export default compose(
    graphql(searchproperty, { name: "searchproperty" }),
    graphql(addBooking, { name: "addBooking" })
    )
    (withApollo(travellerdashboard))
