import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Accordion,AccordionItem,AccordionItemTitle,AccordionItemBody} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';



class Messages extends Component{
        constructor(props){
            super(props);

            this.state={
                data:[],
                answer:""
            }
            
            
            this.submitAnswer=this.submitAnswer.bind(this);
            this.answerHandler=this.answerHandler.bind(this);
        }

        componentDidMount=(e)=>{

            if(this.props.Owner==true){
                var data={
                    ownername:this.props.name
                }
                axios.post('http://localhost:3001/getOwnerQuestionDetails',data)
                .then(response=>{
                    console.log("Response received",response.data);
                    if(response.data.length==0)
                    {
                        alert("No querys for you");
                    }
                    else{
                    this.setState({
                        data:response.data
                    })
                    console.log("state data",this.state.data);}
                })

            }else{
                data={
                    travellername:this.props.name
                }
                axios.post('http://localhost:3001/getTravellerQuestionDetails',data)
                .then(response=>{
                    console.log("Response received",response.data);
                    if(response.data.length==0){
                        alert("No Questions Asked");
                    }
                    else{
                    this.setState({
                        data:response.data
                    })
                    console.log("state data",this.state.data);}
                })
            }
        }

        answerHandler=(e)=>{
            this.setState({
                answer:e.target.value
            })
          }

          submitAnswer=id=>(e)=>{

            console.log("Question id ",id);
            const data={
                answer:this.state.answer,
                questionID:id
            }
            console.log("Data to be sent",data);

            axios.post('http://localhost:3001/answer',data)
                .then(response=>{
                    console.log("Status code: ",response.status);
                    if(response.status===200){
                        console.log("Asnwer submitted successfully");
                    alert("Answer submitted successfully");
                        // window.location.href('/ownerdashboard');
                        this.props.history.push('/OwnerDash'); 
                    }
                })
                .catch(err=>{
                    console.log("Error while sending the answer")
                })
            }

            render(){

                let detailsForTraveller=this.state.data.map((qanda,i)=>{
                    return(
                        <div>
               
                        <Accordion style={{'marginTop':'20px'}}> 
                 <AccordionItem >
                 <AccordionItemTitle>
                 
                 <h3 className="u-position-relative" style={{'font-family': '"Comic Sans MS", cursive, sans-serif'}}> For Property :{qanda.Headline} 
             
                 <div className="accordion__arrow" role="presentation"/>
                </h3>
        
            </AccordionItemTitle>
            <AccordionItemBody>
                        <h4>Listed By:{qanda.OwnerName}</h4>
                <h4>Query Regarding: {qanda.PropertyTopic}</h4>
                <h4>Query :{qanda.PropertyDescription}</h4>
                
                <h4>Answer:  {qanda.Answer}</h4>

            </AccordionItemBody>
        </AccordionItem>
        
    </Accordion>
                
            </div>

                    )

                })

                let detailsForOwner=this.state.data.map((qanda,i)=>{
                    return(
                        <div>
                           
                           <Accordion style={{'marginTop':'20px'}}> 
                    <AccordionItem >
                    <AccordionItemTitle>
                    
                    <h3 className="u-position-relative" style={{'font-family': '"Comic Sans MS", cursive, sans-serif'}}>{i+1} Property: {qanda.Headline}
                    <div className="accordion__arrow" role="presentation"/>
                    </h3>
                    
                        </AccordionItemTitle>
                        <AccordionItemBody>
                        <h4>Regarding:{qanda.PropertyTopic}</h4>
                            <h4>More Info :{qanda.PropertyDescription}</h4>
            
                             <div>
                             <textarea id="ta" onChange={this.answerHandler} name="Answer" placeholder={qanda.Answer} rows="5" cols="20" style={{'margin-left':'1px','width': '100%','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}></textarea>
                             
                             <input type="submit" onClick={this.submitAnswer(qanda._id)}  value="Submit Answer"  style={{'vertical-align':'middle','width':'40%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center'}}/>
            
                            </div>
                            
                        </AccordionItemBody>
                    </AccordionItem>    
                </Accordion>
                            
                        </div>
                    )
                })
if(this.props.Traveller==true)
{
    return(
        
        <div>
        
        <div >
    
      <li class="nav-link"><Link class="blue" to="/TravellerBoard">Home</Link></li>
            </div>

                
                <h2>Questions and Answers</h2>

                {detailsForTraveller}
        </div>
    )
}

else {
    return(
        <div style={{'marginTop':'70px'}}>
            
            
            <div >
    
    <li class="nav-link"><Link class="blue" to="/OwnerDash">Home</Link></li>
          </div>

            <div className="rowMessage" style={{'backgroundColor':'rgb(248, 249, 250)'}}>
            <div className="columnMessage">
                {detailsForOwner}
            </div>
            <div className="columnMessage" style={{'marginTop':'100px','backgroundColor':''}}>

            </div>

                
             </div>   
            
               
        </div>
    )

}
}}

const mapStateToProps = state =>{
    console.log(state);
    return {
        Traveller:state.Traveller,
        Owner:state.Owner,
        name:state.user[0].UserName
    }
}

const mapDispatchStateToProps = dispatch => {
    return {

        onPropClickHandle : (data) => {
            console.log(data);
                    dispatch({type: 'OWNERPROP',payload : data,statusCode : "200"})
            
            
        }
    }
}
export default connect(mapStateToProps,mapDispatchStateToProps)(Messages);