import { gql } from 'apollo-boost';


const loginUser = gql`
    query loginUser($UserName: String, $Password: String){
        loginUser(UserName: $UserName, Password: $Password){
            UserName
            Password
            
        }
    }
`;



export {loginUser};



const search = gql`
    query search($Start: String, $End: String,$City:String, $Accomodates:String){
        search(Start: $Start, End: $End,City:$City,Accomodates:$Accomodates){
            City
            BedRoom
            BathRoom
            RentalRates
            Accomodates
            Headline
            
            

            
        }
    }
`;
export {search};


const searchproperty = gql`
    query searchproperty($Headline: String){
        searchproperty(Headline: $Headline){
            City
            BedRoom
            BathRoom
            RentalRates
            Accomodates
            Headline
            Description
            
            

            
        }
    }
`;
export {searchproperty};

const TravellerTrip = gql`
    query TravellerTrip($UserName: String){
        TravellerTrip(UserName: $UserName){
            City
            BedRoom
            BathRoom
            RentalRates
            Accomodates
            Headline
            PropertyListedBy
            
            

            
        }
    }
`;
export {TravellerTrip};

const OwnerBooked = gql`
    query OwnerBooked($UserName: String){
        OwnerBooked(UserName: $UserName){
            City
            BedRoom
            BathRoom
            RentalRates
            Accomodates
            Headline
            PropertyBookedBy
            
            

            
        }
    }
`;
export {OwnerBooked};

const OwnerProperties = gql`
    query OwnerProperties($UserName: String){
        OwnerProperties(UserName: $UserName){
            City
            BedRoom
            BathRoom
            RentalRates
            Accomodates
            Headline
            PropertyBookedBy
            
            

            
        }
    }
`;
export {OwnerProperties};

const Userinfo = gql`
    query Userinfo($UserName: String){
        Userinfo(UserName: $UserName){
            UserName
            FirstName
            LastName
            UserName
            City
            Gender
            AboutMe
            Company
            School
            HomeTown
            Languages
            Gender
            Profilepic
            
            

            
        }
    }
`;
export {Userinfo};

// const loginUser = gql`

//    query loginUser($UserName: String, $Password: String){
//         loginUser(UserName: $UserName, Password:$Password){
//             UserName
//             Password
//         }
//     }
    
// `;

//export {loginUser};

