import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import Header2 from '../Headers/OwnerHeader';

//Define a Login Component
 class OwnerPropertysBooked extends Component
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
            username:this.props.name
            
        }
        console.log(data);
      axios.post('http://localhost:3001/OwnerPropertiesBooked',data)
        .then(async (response) => {
            console.log(response);
            if(response.data.updatedList.length==0){
                alert("you have nt Booked any property!!! Please ClickTo HomeAway");
        
            }
            else{
        this.setState({
            properties : this.state.properties.concat(response.data.updatedList) 
        });
      console.log(response.data.length);
       this.state.properties.map (property =>
            {
              
               console.log(property.ImageName);
               i=property.ImageName.split(',');
                //console.log(i[0]);
      axios.post('http://localhost:3001/download/'+i[0])
                .then(response => {
                    console.log("Imgae Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    this.setStateAsync({imageView: this.state.imageView.concat(imagePreview)  });
                });
            })

                
        }
        
      } );
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
            <img class="images"   src={this.state.imageView[i]}/> 
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
             Booked By: <p>{property.PropertyBookedBy}</p>
              
             
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
                  <Header2></Header2>
                    </div>
                
               <div class="row">
        
               <p class="p1">       Your Properties Booked:</p>
              
   
                     
                    
               </div>
                        
                    <div class="mainpage">
                       {details}
                    </div>
                </div>
                    
                )
            }
        }
        const mapStateToProps = state => { 
            console.log(state); 
           
            return {
             name:state.user[0].UserName
            }
        }
        export default connect(mapStateToProps)(OwnerPropertysBooked);
