import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
import listprop from './ListProperty/ListProperty';
import OwnerLogin from './Owner/OwnerLogin'
import traveller from './Traveller/Traveller';

import HomeDisplay from './Home/HomeDisplay'
import SignUp from '../components/SignUp/SignUp';
import SignUpEmail from './SignUp/SignUpEmail';
import properties from './ListProperty/properties';

import Avail from './ListProperty/Availbility';
import ListDetials from './ListProperty/ListDetails';
import RentalRates from './ListProperty/RentalRates';
import Post from './SignUp/PostSignUp';

import EditProfile from './SignUp/EditProfile';
import ImageInsert from './ListProperty/ImageInsert';
import TravellerDash from './Traveller/TravellerDash';

import Trip from './Traveller/TravellerTripBooked';
import OwnerProperty from  './Owner/OwnerDash';
import OwnerPropertyBooked from './Owner/OwnerPropetiesBooked';
import Details from './Traveller/Detail';
import Login from './Traveller/Traveller1';
import OwnerSignUp from './SignUp/SignUpEmailOwner';
import SignUpEmailOwner from './SignUp/SignUpEmailOwner';
import Inbox from './Headers/Inbox';

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
                <Route path="/Inbox" component={Inbox}/>
                <Route path="/HomeDisplay"  component={HomeDisplay}/>
                <Route path="/SignUp" component={SignUp}/>
                <Route path="/SignUpEmail" component={SignUpEmail}/>
                <Route path="/Property" component={properties}/>
               
                <Route path="/ListDetails" component={ListDetials}/>
                <Route path="/Avail" component={Avail}/>
                <Route path="/RentalRates" component={RentalRates}/>
                <Route path="/Post" component={Post}/>
               
                <Route path="/ImageInsert" component={ImageInsert}/>
                <Route path="/EditProfile" component={EditProfile}/>
                <Route path="/TravellerSearch" component={TravellerDash}/>
           
                <Route exact path="/TravellerBoard" component={Trip}/>
                <Route path="/OwnerDash" component={OwnerProperty}/>
                <Route path="/Ownerpropertybooked" component={OwnerPropertyBooked}/>
                <Route path="/Details" component={Details}/>
                <Route path="/Login" component={Login}/>
                <Route path="/SignUpEmailOwner" component={SignUpEmailOwner}/>
              
            </div>
        )
        }
}

export default Main;