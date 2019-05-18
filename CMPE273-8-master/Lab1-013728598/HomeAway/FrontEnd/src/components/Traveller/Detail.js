import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import TravellerHeader from './TravellerHeader';
import Carousel from 'react-image-carousel';

 

import image from '../PostSignUp/Profile.png'



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
            imageView: [],
            Charge:''
            
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
          dummy:"ok"
        }
        console.log(data);
       
      axios.post('http://localhost:3001/Detail',data)
        .then(async (response) => {
            console.log(response.data);
           
        this.setState({
            properties : this.state.properties.concat(response.data),
        
            
        });
        
      console.log(response.data.length);
      console.log(response.data);
      
               
      
       this.state.properties.map (property =>
            {
                // var dataimage =
                // {
                //     path:property.image,
                //     name:property.imagename
                // }
                console.log(property.ImageNames);
               i= property.ImageNames.split(',');
                console.log(i.length);
               
                
             for(let size=0;size<i.length;size++){
                 console.log(size);  
      axios.post('http://localhost:3001/download/'+i[size])
                .then(response => {
                    console.log("Imgae Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                 this.setStateAsync({imageView: this.state.imageView.concat(imagePreview)  });
                });
            }
                
            })

                
        });
        
    
    }
    handlebook(e) {
        console.log(e);
        const data={
                Username:cookie.load('cookieU'),
                PropertyID:e,
                Start:cookie.load('Start'),
                End:cookie.load('End'),
        }
                axios.post('http://localhost:3001/Book',data)
        .then( (response) => {
            if(response.status === 200){
                this.setState({
                    authFlag : true,
                    inserted:true
                   
                })
                window.location.href="http://localhost:3000/TravellerBoard";
            }else{
                this.setState({
                    authFlag : false
                })
            }
    });
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
            
                
            <div className="my-carousel">
           
            <Carousel images={this.state.imageView} 
                        thumb={true}
                        loop={true}
                        autoplay={3000} class="imagedetail">  </Carousel>
                         
                        

                 
                       
                        
        </div> 
        </div>
        </div>
        </div>
        )
        })
        let details2 = this.state.properties.map(property => {
           
                return (
                    
            <div class="backclm">
            <div class="mar">
            <div class="border2">
            <div class="row">
            
       
            <div class="h">    
              <h3> {property.HeadLine}</h3>
              <div class="row">
              <p> BedRoom: {property.BedRoom} | </p>
              <p>BathRooms: {property.BathRoom} |</p>
              <p>Sleeps: {property.Accomodates}</p>
           
              
              </div>
              <p>$ {property.RentalRates} per night </p>
            City:  <p>{property.City}</p>
            Description:<p>{property.Description}</p>


              <button onClick={() =>this.handlebook(property.PropertyID)}>BookNow</button>
             
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

       <p class="p1">       You Clicked This property to view:</p>
       <br></br>
        
             
             
            
       </div>
                
            <div class="mainpage">
               {details}
               {details2}
            </div>
        </div>
            
        )
    }
}
//export Login Component
export default travellerdashboard;