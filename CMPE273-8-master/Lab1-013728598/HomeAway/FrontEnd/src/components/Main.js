import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
import listprop from './ListProperty/ListProperty';
import OwnerLogin from './Owner/OwnerLogin'
import traveller from './Traveller/Traveller';
import TestProperty from './ListProperty/TestProperty';
import HomeDisplay from './HomeDis/HomeDisplay'
import SignUp from './SignUp';
import SignUpEmail from './SignUpEmail';
import properties from './Properties/properties';
import Welcome from './Properties/Welcome';
import Avail from './Properties/Availbility';
import ListDetials from './Properties/ListDetails';
import RentalRates from './Properties/RentalRates';
import Post from './PostSignUp/PostSignUp';
import Post1 from './PostSignUp/Post1';
import EditProfile from './EditProfile';
import ImageInsert from './Properties/ImageInsert';
import TravellerDash from './Traveller/TravellerDash';
import Noproperty from './Owner/NoPropertyListed';
import NoBooking from './Traveller/NoBooking';
import Trip from './Traveller/TravellerTripBooked';
import OwnerProperty from  './Owner/OwnerDash';
import OwnerPropertyBooked from './Owner/OwnerPropetiesBooked';
import Details from './Traveller/Detail';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Home}/>
                <Route path="/listprop" component={listprop}/>
                 <Route path="/Ownerlogin" component={OwnerLogin}/>
                <Route path="/traveller" component={traveller}/>
                <Route path="/testProperty" component={TestProperty}/>
                <Route path="/HomeDisplay"  component={HomeDisplay}/>
                <Route path="/SignUp" component={SignUp}/>
                <Route path="/SignUpEmail" component={SignUpEmail}/>
                <Route path="/properties" component={properties}/>
                <Route path="/Welcome" component={Welcome}/>
                <Route path="/ListDetails" component={ListDetials}/>
                <Route path="/Avail" component={Avail}/>
                <Route path="/RentalRates" component={RentalRates}/>
                <Route path="/Post" component={Post}/>
                <Route path="/Post1" component={Post1}/>
                <Route path="/ImageInsert" component={ImageInsert}/>
                <Route path="/EditProfile" component={EditProfile}/>
                <Route path="/TravellerSearch" component={TravellerDash}/>
                <Route path="/NoPropertyListed" component={Noproperty}/>
                <Route path="/NoBooking" component={NoBooking}/>
                <Route exact path="/TravellerBoard" component={Trip}/>
                <Route path="/OwnerDash" component={OwnerProperty}/>
                <Route path="/Ownerpropertybooked" component={OwnerPropertyBooked}/>
                <Route path="/Details" component={Details}/>
              
            </div>
        )
        }
}

export default Main;