const initialStore = {
   authFlag : false,
   Edited:false,
   Address:false,
   ImageInsert:false,
   Availibility:false,
   SubmitProperty:false,
   Search:false,
   getProperty:false,
   Traveller:false,
   Owner:false,
   Property:[],
   user : [],
   id:''
}

const reducer = (state = initialStore,action) => {
    if(action.type === "LOGIN" && action.statusCode == 200){
        console.log("Action",action.payload);
        return {
            
            ...state,
            user : state.user.concat(action.payload.resData.user),
            authFlag : action.payload.resData.authFlag,
            Edited:false,
            Search:false,
            Traveller:true
        }
    }
    if(action.type === "OwnerLOGIN" && action.statusCode == 200){
        //console.log(action.payload);
        return {
            
            ...state,
            user : state.user.concat(action.payload.updatedList.user),
            authFlag : action.payload.updatedList.authFlag,
            Edited:false,
            Search:false,
            Owner:true
        }
    }
    if(action.type === "LOGIN" && action.status == 400){
        return {
            ...state,
            authFlag : action.payload.authFlag
        }
    }
    if(action.type === "SignUp" && action.statusCode == 200){
        return {
            ...state,
           
            AccountCreated:true
        }
    }
    if(action.type === "GetInfo" && action.statusCode == 200){
      
        return {
            ...state,
            user : state.user.concat(action.payload)
        }
    }
    if(action.type === "EditProfile" && action.statusCode == 200){
   
        return {
            ...state,
            Edited:true,
            authFlag:false
        }
    }
    if(action.type === "Property" && action.statusCode == 200){
        console.log(action.payload)
        return {
            ...state,
            Property:state.Property.concat(action.payload),
            Address:true,
            Detail:false
            
        }
    }
    if(action.type === "Details" && action.statusCode == 200){
        console.log(action.payload)
        return {
            ...state,
            Property:state.Property.concat(action.payload),
            Detail:true,
            ImageInsert:false
            
        }
    }
    if(action.type === "ImageInsert" && action.statusCode == 200){
        console.log(action.payload)
        return {
            ...state,
            Property:state.Property.concat(action.payload),
            ImageInsert:true,
            Availibility:false
            
        }
    }
    if(action.type === "Availibility" && action.statusCode == 200){
        console.log(action.payload)
        return {
            ...state,
            Property:state.Property.concat(action.payload),
            Availibility:true,
            SubmitProperty:false
            
        }
    }
    if(action.type === "RentalRates" && action.statusCode == 200){
        console.log(action.payload)
        return {
            ...state,
            Property:state.Property.concat(action.payload),
            SubmitProperty:true,
            Address:false,
            ImageInsert:false,
            Availibility:false,
           Detail:false,
            Search:false,
            getProperty:false,

            
        }
    }
    if(action.type === "Search" && action.statusCode == 200){
      //  console.log(action.payload)
        return {
            ...state,
            Property:(action.payload),
            Search:true,
            getProperty:false
            
        }
    }
    if(action.type === "Searchfil" && action.statusCode == 200){
        //  console.log(action.payload)
          return {
              ...state,
              Property:(action.payload),
            
              
          }
      }
    if(action.type === "handle" ){

        return {
            ...state,
           
            Search:false
            
        }
    }
    if(action.type === "hANDLE" ){

        return {
            ...state,
           
            Property:[],
            Address:false,
   ImageInsert:false,
   Availibility:false,
   SubmitProperty:false,

            
        }
    }
    if(action.type === "filter" ){

        return {
            ...state,
           
         Property:action.payload
            
        }
    }
    if(action.type ==='getproperty'){
        return{
        ...state,
        getProperty:true,
        id:action.payload

    }
}
if(action.type === "ImageGet" && action.statusCode == 200){
    console.log(action.payload)
    return {
        ...state,
       Image :(action.payload),
     
        
    }
}

    return state;
}

export default reducer;