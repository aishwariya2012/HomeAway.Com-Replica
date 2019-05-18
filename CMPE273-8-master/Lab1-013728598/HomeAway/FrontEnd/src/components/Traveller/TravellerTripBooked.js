import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import TravellerHeader from './TravellerHeader';
//Define a Login Component
class travellerdashboard extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            properties : [],
            imageView: []
        }
    }
    setStateAsync(state) {
        return new Promise(resolve => {
          this.setState(state, resolve);
        });
      }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        var properties,i;
        var data={
            username:cookie.load('cookieU'),
            
        }
        console.log(data);
      axios.post('http://localhost:3001/TravellerTrip',data)
        .then(async (response) => {
        this.setState({
            properties : this.state.properties.concat(response.data) 
        });
      console.log(response.data.length);
       this.state.properties.map (property =>
            {
                // var dataimage =
                // {
                //     path:property.image,
                //     name:property.imagename
                // }
               console.log(property.ImageNames);
               i=property.ImageNames.split(',');
                console.log(i[0]);
      axios.post('http://localhost:3001/download/'+i[0])
                .then(response => {
                    console.log("Imgae Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    this.setStateAsync({imageView: this.state.imageView.concat(imagePreview)  });
                });
            })

                
        });
        
        console.log(properties);
    }
   

    render()
    {
        var i=-1;
        let details = this.state.properties.map(property => {
            i=i+1;
                return (
                    
            <div class="backclm">
            <div class="mar">
            <div class="border2">
            <div class="row">
            <img class="images"  onClick={() =>this.imageClick(property.PropertyID)} src={this.state.imageView[i]}/> 
            <div class="h">    
              <h3> {property.HeadLine}</h3>
              <div class="row">
              <p> {property.BedRoom} BedRoom |</p>
              <p>{property.BathRoom} BathRooms|</p>
              <p>Accomodates {property.Accomodates}|</p>
              <p>$ {property.RentalRates}</p>
              
              </div>
                From: {property.Start} 
                <br></br>
                To: {property.End}
              <p>{property.City}</p>
              
             
</div>
</div>
          </div>
                
                
                </div>
                </div>
                       
                 
              
                )
            })
        
        
            return(       
                <div >
                    
                    <div >
                    <TravellerHeader></TravellerHeader>
                    </div>
                
               <div class="row">
        
               <p class="p1">       Your Booked Trips:</p>
              
                     
                     
                    
               </div>
                        
                    <div class="mainpage">
                       {details}
                    </div>
                </div>
                    
                )
            }
        }
//export Login Component
export default travellerdashboard;