const graphql = require('graphql');
const _ = require('lodash');

var mongoose = require('mongoose');
var {userdata}=require("../models/userinfo")
var {PropertyData}=require("../models/PropertyData");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const PropertyType=new GraphQLObjectType({
    name:"Property",
    fields:()=>({
        Booking:{
            type:GraphQLInt
        },
        Start:{
            type:GraphQLString
        },
        End:{
            type:GraphQLString
        },
        AddressLine1:{
            type:GraphQLString
        },
        AddressLine2:{
            type:GraphQLString
        },
        City:{
            type:GraphQLString
        },
       Country:{
            type:GraphQLString
        },
      ZipCode:{
        type:GraphQLInt
    },
    Headline:{
        type:GraphQLString
    },
    Description:{
        type:GraphQLString
    },
    PropertyType:{
        type:GraphQLString
    },
    BedRoom:{
        type:GraphQLInt
    },
    BathRoom:{
        type:GraphQLInt
    },
    Accomodates:{
        type:GraphQLInt
    },
    AvailableStartDate:{
        type:GraphQLInt
    },
    AvailableEndDate:{
        type:GraphQLInt
    },
    
    Currency:{
        type:GraphQLString
    },
    RentalRates:{
        type:GraphQLInt
    },
    Night:{
        type:GraphQLInt
    },
    PropertyListedBy:
    {
        type:GraphQLString
    },
    PropertyBookedBy:
    {
    type:GraphQLString
    },
    ImageName:{
        type:GraphQLString
    },
    

    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        UserName: { type: GraphQLString },
        PasswordEncrypt: { type: GraphQLString },
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Password:{type:GraphQLString},
  
        City:{ type: GraphQLString },
       
        Gender:{ type: GraphQLString },
        AboutMe:{ type: GraphQLString },
        Company:{ type: GraphQLString },
        School:{ type: GraphQLString },
        HomeTown:{ type: GraphQLString },
        Languages:{ type: GraphQLString },
        Gender:{ type: GraphQLString },
        Profilepic:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
       
        search:{
            type : new GraphQLList(PropertyType),
            args:{
                Start:{type:GraphQLString},
                End:{type:GraphQLString},
                City:{type:GraphQLString},
                Accomodates:{type:GraphQLString}
            },
          async  resolve(parent,args){
              console.log("You Searched For",args);
                 var user=await PropertyData.find({
                     "City":args.City
                 })
                
                 console.log("Searched Properties Result:",user);
                
             return(user);
            }
            },
            TravellerTrip:{
                type : new GraphQLList(PropertyType),
                args:{
                   UserName:{type:GraphQLString}
                },
              async  resolve(parent,args){
                     var user=await PropertyData.find({
                         "PropertyBookedBy":args.UserName
                     })
                    
                     console.log(user);
                    
                 return(user);
                }
        },
        OwnerProperties:{
            type : new GraphQLList(PropertyType),
            args:{
               UserName:{type:GraphQLString}
            },
          async  resolve(parent,args){
                 var user=await PropertyData.find({
                     "PropertyListedBy":args.UserName
                 })
                
                 console.log("Your Properties listed",user);
                
             return(user);
            }
    },
        OwnerBooked:{
            type : new GraphQLList(PropertyType),
            args:{
               UserName:{type:GraphQLString}
            },
          async  resolve(parent,args){
                 var user=await PropertyData.find({
                    PropertyListedBy:args.UserName,
                    Booking:1
             
             
                 })
                
                 console.log("Your Proerties Booked",user);
                
             return(user);
            }
    },
    Userinfo:{
        type : UserType,
        args:{
          UserName:{type:GraphQLString}
        },
      async  resolve(parent,args){
          console.log(args.UserName);
             var user=await userdata.findOne({
                 "UserName":args.UserName
             })
            
             console.log("Userinfo",user);
            
         return(user);
        }
    },
        
    searchproperty:{
            type : (PropertyType),
            args:{
              Headline:{type:GraphQLString}
            },
          async  resolve(parent,args){
              console.log("Your property you clicked to view")
                 var user=await PropertyData.findOne({
                     "Headline":args.Headline
                 })
                
                 console.log(user);
                
             return(user);
            }
            

            
           
            
        },
        loginUser: {
            type: UserType,
            args: { 
                        UserName: { type: GraphQLString },
                        Password:{ type: GraphQLString } 
                     },
                 async resolve(parent, args){
                    console.log("login args",args)
                    var data=""
                    var user = await userdata.findOne({"UserName":args.UserName,"Password":args.Password})
                    console.log(user);



                return(user)
            }
          
    
                
               
                
            
           

            
            
        }
    }
});
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addUserMutation:{
            type:UserType,
            args:
            {
               
                UserName: { type: GraphQLString },
                Password:{ type: GraphQLString },
                FirstName:{type:GraphQLString},
                LastName:{type:GraphQLString} 
            },
            resolve(parent,args){
                let user=new userdata({
                   UserName:args.UserName,
                   Password:args.Password,
                   FirstName:args.FirstName,
                   LastName:args.LastName
                });
               user.save();
               console.log(user);
               return (user);
             }

        },
        
        ProfileEdit:{
            type:UserType,
            args:
            {
               
                UserName: { type: GraphQLString },
            PasswordEncrypt: { type: GraphQLString },
            FirstName: { type: GraphQLString },
            LastName: { type: GraphQLString },
            Password:{type:GraphQLString},
      
            City:{ type: GraphQLString },
           
            Gender:{ type: GraphQLString },
            AboutMe:{ type: GraphQLString },
            Company:{ type: GraphQLString },
            School:{ type: GraphQLString },
            HomeTown:{ type: GraphQLString },
            Languages:{ type: GraphQLString },
            Gender:{ type: GraphQLString },
            Profilepic:{type:GraphQLString}
            },
          async  resolve(parent,args){
            //     let user=new userdata({
            //        UserName:args.UserName,
            //        Password:args.Password,
            //        FirstName:args.FirstName,
            //        LastName:args.LastName
            //     });
            //    user.save();
            //    console.log(user);
           var user=await    userdata.findOneAndUpdate({
                   "UserName":args.UserName

               },{
                   $set:
                                {
                                    UserName:args.UserName,
            FirstName:args.FirstName,
            LastName:args.LastName,
          
            City:args.City,
            Gender:args.Gender,
            AboutMe:args.AboutMe,
            Company:args.Company,
            School:args.School,
            HomeTown:args.HomeTown,
            Languages:args.Languages,
            Gender:args.Gender
                            }
            }
            
               )
               console.log("Your Updated Profile",user);
               return (user);
             }

        },
        addBooking:{
            type:PropertyType,
            args:
            {
               
                UserName: { type: GraphQLString },
                Headline:{type:GraphQLString}
             
            },
          async  resolve(parent,args){
            //     let user=new userdata({
            //        UserName:args.UserName,
            //        Password:args.Password,
            //        FirstName:args.FirstName,
            //        LastName:args.LastName
            //     });
            //    user.save();
            //    console.log(user);
           var user=await    PropertyData.findOneAndUpdate({
                   "Headline":args.Headline

               },{
                   $set:
                                {
                                   PropertyBookedBy:args.UserName,
                                   Booking:1
                            }
            }
            
               )
               console.log(user);
               return (user);
             }

        }
        // ProfileEdit:{
        //     type:UserType,
        //     args:{
        //     UserName: { type: GraphQLString },
        //     PasswordEncrypt: { type: GraphQLString },
        //     FirstName: { type: GraphQLString },
        //     LastName: { type: GraphQLString },
        //     Password:{type:GraphQLString},
      
        //     City:{ type: GraphQLString },
           
        //     Gender:{ type: GraphQLString },
        //     AboutMe:{ type: GraphQLString },
        //     Company:{ type: GraphQLString },
        //     School:{ type: GraphQLString },
        //     HomeTown:{ type: GraphQLString },
        //     Languages:{ type: GraphQLString },
        //     Gender:{ type: GraphQLString },
        //     Profilepic:{type:GraphQLString}
        // }, resolve(parent,args){
        //     let user=new userdata({
        //         UserName:args.UserName,
        //     FirstName:args.FirstName,
        //     LastName:args.LastName,
          
        //     City:args.City,
        //     Gender:args.Gender,
        //     AboutMe:args.AboutMe,
        //     Company:args.Company,
        //     School:args.School,
        //     HomeTown:args.HomeTown,
        //     Languages:args.Languages,
        //     Gender:args.Gender
        //     });
        //    user.save();
        //    console.log(user);
        //    return (user);
        //  }

        // },
    }
       
        
    
});



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
 
});