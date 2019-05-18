import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import TravellerHeader from './TravellerHeader';

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
            Search:cookie.load('Search'),
            Start:cookie.load('Start'),
            End:cookie.load('End'),
            Guest:cookie.load('Guest')
        }
        console.log(data);
        console.log(this.props.location.state.key);
      axios.post('http://localhost:3001/TravellerDash',data)
        .then(async (response) => {
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
    handlebook(e) {
        console.log(e);
        const data={
                Username:cookie.load('cookieU'),
                PropertyID:e
        }
                axios.post('http://localhost:3001/Book',data)
        .then( (response) => {
            if(response.status === 200){
                this.setState({
                    authFlag : true,
                    inserted:true
                   
                })
                window.location.href="http://localhost:3000/Details";
            }else{
                this.setState({
                    authFlag : false
                })
            }
    });
}
imageClick = (e) => {
    console.log(e);
    const data={
   id:e
    }
    axios.post('http://localhost:3001/id',data)
    .then( (response) => {
        if(response.status === 200){
            this.setState({
                authFlag : true,
                inserted:true
               
            })
            window.location.href="http://localhost:3000/Details";
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

       <p class="p1">       You Searched For:</p>
       <br></br>
       <div class="form-group space1">
           Place:   <input value={cookie.load('Search')} type="text" class="form-control" name="add1" placeholder="First" autofocus/>
             </div>
             
             <div class="form-group space1">
            Start Date  <input value={cookie.load('Start')} type="text" class="form-control" name="add1" placeholder="First" autofocus/>
             </div>
             <div class="form-group space1">
            End Date:  <input value={cookie.load('End')} type="text" class="form-control" name="add1" placeholder="First" autofocus/>
             </div>
             <div class="form-group space1">
             Guest: <input value={cookie.load('Guest')} type="text" class="form-control" name="add1" placeholder="First" autofocus/>
             </div>
             
             
            
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