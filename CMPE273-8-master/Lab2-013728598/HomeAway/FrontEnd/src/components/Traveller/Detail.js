import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Carousel from 'react-image-carousel';

import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import TravellerHeader from '../Headers/TravellerHeader';
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
            Charge:'',
            open:false,
            Quesdecription:"",
            propertyTopic:""
            
        }
        this.openbox=this.openbox.bind(this);
        this.closebox=this.closebox.bind(this);
        this.propertyTopic=this.propertyTopic.bind(this);
        this.Quesdecription=this.Quesdecription.bind(this);
        this.sendQuery=this.sendQuery.bind(this);
    }
   
    
    componentWillMount(){
        var properties,i;
    //  
    const data={
        id:this.props.id
    }
       
       axios.post('http://localhost:3001/Detail',data)
        .then(async (response) => {
            console.log(response.data);
           
         this.setState({
            properties : this.state.properties.concat(response.data.updatedList.Properties[0]),
        
            
        });
        this.state.properties.map (property =>
            {
               
                console.log(property.ImageName);
               i= property.ImageName.split(',');
                console.log(i.length);
               
                
             for(let size=0;size<i.length;size++){
                 console.log(size);  
      axios.post('http://localhost:3001/download/'+i[size])
                .then(response => {
                    console.log("Imgae Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                 this.setState({imageView: this.state.imageView.concat(imagePreview)  });
                });
            }
                
            })

                
        });
        }
        

        openbox(){
            this.setState({
                open:true
            })
        }
        closebox(){
            this.setState({
            open:false
            })
        }
    Quesdecription=(e)=>{
            this.setState({
                Quesdecription:e.target.value
            })
          }
    
         propertyTopic=(e)=>{
    
            this.setState({
                propertyTopic:e.target.value
            })
    
          }
        sendQuery=(e)=>{
            e.preventDefault();
            const data={
            propertyTopic:this.state.propertyTopic,
            Quesdecription:this.state.Quesdecription,
            PropertyId:this.props.id,
            OwnerName:this.state.properties[0].PropertyListedBy,
            TravellerName:this.props.name,
            Headline:this.state.properties[0].Headline
            }
            console.log("data",data);
            axios.post('http://localhost:3001/question',data)
            .then(response=>{
                console.log("Status code ",response.status);
                if(response.status===200){
                    console.log("Question submitted successfully");
                    

                    this.setState({
                        open:false
                    })
                }else{
                    console.log("Error in the scene");
                }

            })
            .catch(err=>{
                console.log("Error in question part");
            })
        }
        
        
    handlebook(e) {
        console.log(e);
        const data={
                Username:this.props.name,
                PropertyID:e,
                Start:this.props.Parameter.Start,
                End:this.props.Parameter.End
              
        }
        console.log(data);
                axios.post('http://localhost:3001/Book',data)
        .then( (response) => {
            if(response.status === 200){
                this.setState({
                    authFlag : true,
                    inserted:true
                   
                })
             
            }else{
                this.setState({
                    authFlag : false
                })
            }
    });
  
}

   

    render()
    {
        let redirectVar = null;
        const {open}=this.state;
        if(this.state.inserted===true){
            redirectVar = <Redirect to= "/TravellerBoard"/>
        }
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


              <button onClick={() =>this.handlebook(property._id)}>BookNow</button>
              <button onClick={this.openbox}>Ask A Query To the Owner</button>
              <Modal open={open} onClose={this.closebox} center>
                    <h2 style={{'marginTop':'50px','marginBottom':'25px'}}>Get answer to your Queries</h2>
                    <div style={{'horizontalAlign':'middle'}}>
                    <span style={{'display':'block'}}>               
                                      <input type="text" placeholder="What Your Query for Owner?" onChange={this.propertyTopic} style={{'margin-bottom':'10px','width': '100%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                  </span>
          
                      <span style={{'display':'block'}}>
                                      <textarea onChange={this.Quesdecription} placeholder="Tell us more about your query" rows="5" cols="10" style={{'margin-bottom':'10px','width': '100%','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}></textarea>
                      </span>
          
          
                      <span style={{'justifyContent':'center','display':'flex'}}>
                      <input type="submit" value="Not Now" onClick={this.closebox} style={{'vertical-align':'middle','width':'40%','height':'44px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','padding':' 7px 31px','text-align':'center','cursor':'pointer'}}/>
                      
                      
                      <input type="submit"  value="Send"  onClick={this.sendQuery}  style={{'margin-left':'5px','vertical-align':'middle','width':'40%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center','cursor':'pointer'}}/>
          
                      </span>
          
                    </div>
                  </Modal>
             
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
               {details}
               {details2}
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
     getflag:state.getProperty,
     id:state.id.id,
     name:state.user[0].UserName
       
    }
}
//export Login Component

export default connect(mapStateToProps)(travellerdashboard); 
