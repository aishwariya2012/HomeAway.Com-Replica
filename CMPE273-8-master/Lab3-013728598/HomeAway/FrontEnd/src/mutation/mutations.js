
import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation addUserMutation($UserName: String, $Password: String, $LastName:String, $FirstName:String ){
        addUserMutation(UserName: $UserName, FirstName: $FirstName, LastName: $LastName,Password: $Password){
            UserName
            FirstName
            LastName
            Password
        }
    }
`;

export {addUserMutation};

const addBooking = gql`
    mutation addBooking($Headline:String,$UserName:String ){
        addBooking(UserName: $UserName, Headline:$Headline){
            PropertyListedBy
            PropertyBookedBy
            Booking
            
        }
    }
`;

export {addBooking};


const ProfileEdit = gql`
    mutation ProfileEdit($UserName:String,$FirstName:String,$LastName:String,$City:String,$AboutMe:String,$Company:String,
        $School:String,$HomeTown:String,$Languages:String,$Gender:String ){
        ProfileEdit( UserName:$UserName,FirstName:$FirstName,LastName:$LastName, City:$City,
            Gender:$Gender,
            AboutMe:$AboutMe,
            Company:$Company,
            School:$School,
            HomeTown:$HomeTown,
            Languages:$Languages,
            ){
            UserName
            FirstName
            LastName
          
            City
            Gender
            AboutMe
            Company
            School
            HomeTown
            Languages
            Gender
                       
        }
    }
`;

export {ProfileEdit};