import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
class ProfilePicture extends Component {
    constructor(props){
        super(props);
        this.state={
            fileType:"",
            file:null,
            inputFile:false,
            filename:""
        }
        this.changepicture=this.changepicture.bind(this); 
        this.handleChange= this.handleChange.bind(this);
        this.handleSave =this.handleSave.bind(this);
        //this.View1=this.View1.bind(this);
    }
async changepicture(event){
    console.log("clicked on");
    this.setState({
        inputFile:true,
        });
    
}
handleChange(event){
    let file = event.target.files[0];
   // console.log(this.state.file.name)
        this.setState({
            file: file,
            filename:file.name
        });
      

}
   handleSave(event){
    const data = new FormData();
   
    data.append('username',this.props.username);
    data.append('profilepic', this.state.file);
    data.append('Filename',this.state.file.name);
    console.log(this.state.file.name);
    this.props.updateprofile(data);
   }
    
    componentWillMount(){
       this.props.getimage(this.props.profileimage);
    }

    render(){
        let image_tag=null
        let pencil=null
        let image_select_tag=null
        image_tag = <img id = "profile_image" className="img-circle" src= { this.props.Image} alt="Smiley face" height="150px" width="150px" />
        pencil =<i class="fa fa-pencil" ></i>
        if(this.state.inputFile==true){
            image_select_tag=(<div><input type={"file"}  name={"profilepic"}accept={"image/png,image/jpg"} onChange={this.handleChange}></input>
            <button onClick={this.handleSave}> save</button></div>);
        }
        return(
            
            <div>
                <div className="form-group">
                    {image_tag}
                    <div onClick={this.changepicture}>
                   {pencil}
                   {image_select_tag
                   }
                    </div>
                   
                   
                </div>


            </div>
        )
    }


}
function mapStateToProps(state){
    
    return{
        profileimage:state.user[0].Profilepic,
        username:state.user[0].FirstName,
        Image:state.Image
    }
}
const mapDispatchStateToProps = dispatch => {
    return {
        getimage : (data) => {
            axios.post('http://localhost:3001/download/'+data)
                       .then(response => {
                            console.log("Imgae Res : ",response);
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                            dispatch({type: 'ImageGet',payload : imagePreview,statusCode : response.status})
                        });
                    },
        updateprofile:(data)=>{
            axios.post('http://localhost:3001/upload', data)
            .then((result) => {
              console.log(result);
              if(result.status===200){
                  alert("Your Image is Succesfully Uploaded and Will be redirected to Login ");
                  window.location.href="http://localhost:3000/Login"
              }
            });
    
        }
    }

      
}


export default connect(mapStateToProps,mapDispatchStateToProps)(ProfilePicture);