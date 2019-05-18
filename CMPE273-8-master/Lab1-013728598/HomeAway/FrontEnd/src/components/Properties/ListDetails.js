import React, {Component} from 'react';
import axios from 'axios';

import Header2 from '../Header2';
import "../../App1.css";


export default class ListDetails extends Component{
   
    constructor(props){
        super(props);
        this.state = {
            value: '',
            HeadLine:'',
            Description:'',
            BedRoom:'',
            Bathroom:'',
            Accommodates:''


    };
        this.handleChange = this.handleChange.bind(this);
        this.HeadLineChangeHandler = this.HeadLineChangeHandler.bind(this);
        this.DescriptionChangeHandler = this.DescriptionChangeHandler.bind(this);
        this.BedRoomChangeHandler = this.BedRoomChangeHandler.bind(this);
        this.AccomodatesChangeHandler = this.AccomodatesChangeHandler.bind(this);
        this.BathRoomChangeHandler = this.BathRoomChangeHandler.bind(this);
       
        
    }
    handleChange(event) {
        
        this.setState({value: event.target.value});
    }
    HeadLineChangeHandler= (e) => {
        this.setState({
            HeadLine: e.target.value
        })
    }
    DescriptionChangeHandler= (e) => {
        this.setState({
            Description: e.target.value
        })
    }
    BedRoomChangeHandler= (e) => {
        this.setState({
            BedRoom: e.target.value
        })
    }
   BathRoomChangeHandler = (e) => {
        this.setState({
            Bathroom: e.target.value
        })
    }
    AccomodatesChangeHandler= (e) => {
        this.setState({
            Accommodates: e.target.value
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            HeadLine:   this.state.HeadLine,
            Description:this.state.Description,
            PropertyType:   this.state.value,
            BedRoom:    this.state.BedRoom,
            Accomodates:    this.state.Accommodates,
            BathRoom:   this.state.Bathroom,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/ListDetails',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        inserted:true
                       
                    })
                    window.location.href="http://localhost:3000/ImageInsert";
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
     
       
 
        
    }

    render(){
       
        return(
            <div>
                    <div>
                            <Header2></Header2>
                    </div >
                    <div>
                    <div class="outer row">
                                <div class="sidenav">
                                <ui class="new ">
                                <li > <a>Welcome</a></li>
                                    <li > <a  >Location</a></li>
                                    <li > <a  ><b>Details</b></a></li>
                                    <li > <a >Booking Options</a></li>
                                    <li > <a >Photos</a></li>
                                    <li > <a >Security</a></li>
                                    <li > <a >Payments</a></li>
                                    <li > <a >Pricing</a>
                                    <div class="innersidebar">
                    <a >Availbiity</a>
                    <a >Rental Rates</a>
                    <a href="#">Taxes</a>
                    <a href="#">Fees</a>    
                </div>
                                    </li>
                                   
                                    </ui>
                                </div>  

            <div>
                                                                    <div class="location">
                                                                    <div class="login-form1">
                                                                    <div class="main-location">
                                                                    <div><div class="checklist-header-container ">
                        <h3><span>Describe your property</span></h3>
                        <hr></hr>
                        </div>
                        <div>
                            <div></div>
                            <form role="form">
                            <div>
                                <span>Start out with a descriptive headline and a detailed summary of your property.</span>
                            </div>
                            <div class="row1 headline-container out-of-limits">
                                <div class="col-xs-12">
                                    <div class="form-group floating-label empty">
                                    <label class="" for="headline">Headline</label>
                                        <input  onChange = {this.HeadLineChangeHandler} class="form-control" aria-label="Headline" aria-invalid="false" aria-describedby="headline__help" id="headline" name="headline" type="text"  />
                                       
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="row1 out-of-limits">
                                <div class="col-xs-12">
                                    <div class="form-group floating-label empty">
                                    <label class="FormTextArea__floating-label" for="description">Property description</label>
                                        <textarea onChange = {this.DescriptionChangeHandler}  class="FormTextArea__textarea form-control" aria-label="Property description" aria-describedby="description__help" id="description" name="description" rows="8"></textarea>
                                       
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-lg-6">
                                    <div class="form-group floating-label not-empty">
                                        <placeholder>Property type</placeholder>
                                            <div class="FormSelect__wrapper">
                                                <select value={this.state.value} onChange={this.handleChange} aria-label="Property type" name="propertyType" class="form-control FormSelect__select">
                                                    <option value=""></option>
                                                    <option value="apartment">Apartment</option>
                                                    <option value="barn">Barn</option>
                                                    <option value="bed &amp; breakfast">Bed &amp; Breakfast</option>
                                                    <option value="boat">Boat</option>
                                                    <option value="bungalow">Bungalow</option>
                                                    <option value="cabin">Cabin</option>
                                                    <option value="campground">Campground</option>
                                                    <option value="castle">Castle</option>
                                                    <option value="chalet">Chalet</option>
                                                    <option value="country house / chateau">Chateau / Country House</option>
                                                    <option value="condo">Condo</option>
                                                    <option value="corporate apartment">Corporate Apartment</option>
                                                    <option value="cottage">Cottage</option>
                                                    <option value="estate">Estate</option>
                                                    <option value="farmhouse">Farmhouse</option>
                                                    <option value="guest house/pension">Guest House</option>
                                                    <option value="hostel">Hostel</option>
                                                    <option value="hotel">Hotel</option>
                                                    <option value="hotel suites">Hotel Suites</option>
                                                    <option value="house">House</option>
                                                    <option value="house boat">House Boat</option>
                                                    <option value="lodge">Lodge</option>
                                                    <option value="Mill">Mill</option>
                                                    <option value="mobile home">Mobile Home</option>
                                                    <option value="Recreational Vehicle">Recreational Vehicle</option>
                                                    <option value="resort">Resort</option>
                                                    <option value="studio">Studio</option>
                                                    <option value="Tower">Tower</option>
                                                    <option value="townhome">Townhome</option>
                                                    <option value="villa">Villa</option>
                                                    <option value="yacht">Yacht</option></select>
                                                    <i aria-hidden="true" class="icon-chevron-down FormSelect__chevron"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-lg-6">
                                            <div class="form-group floating-label not-empty">
                                            <label class="" for="bedrooms">Bedrooms</label>
                                                <input onChange={this.BedRoomChangeHandler} class="form-control" aria-label="Bedrooms" aria-invalid="false" id="bedrooms" name="bedrooms" type="number" step="1" />
                                               
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-lg-6">
                                            <div class="form-group floating-label not-empty">
                                            <label class="" for="sleeps" >Accommodates</label>
                                                <input onChange={this.AccomodatesChangeHandler} class="form-control" aria-label="Accommodates" aria-invalid="false" id="sleeps" name="sleeps" type="number" max="500" min="1" step="1" />
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-lg-6">
                                            <div class="form-group floating-label not-empty">
                                            <label class="" for="bathrooms">Bathrooms</label>
                                                <input onChange={this.BathRoomChangeHandler} class="form-control" aria-label="Bathrooms" aria-invalid="false" id="bathrooms" name="bathrooms" type="number" max="500" min="1" step="0.5" />
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                                                            <button  class="btn btn-primary btndesign2">Back</button>
                                                                            <button onClick = {this.submitLogin} class="btn btn-primary btndesign1">Next</button>
                                                                            </div>
                                </form>
                            </div>
                        </div>
                     </div>
         </div>
 </div>
 </div>
</div>
</div>          </div>

      
        )
    }
}
