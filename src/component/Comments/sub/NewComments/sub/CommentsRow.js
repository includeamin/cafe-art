import React, {Component, Fragment} from 'react';

import {
    Collapse,
    Button,Label

} from "reactstrap";
import * as Const from "../../../../Const";
import axios from "axios";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";
import FacebookEmoji from "react-facebook-emoji";
import {
    AvForm,
    AvField,
    AvGroup,
    AvInput,
    AvFeedback,
    AvRadioGroup,
    AvRadio,
    AvCheckboxGroup,
    AvCheckbox
} from "availity-reactstrap-validation";
// import FormGroup from "reactstrap/src/FormGroup";
import {FormikCustomCheckbox} from "../../../../../containers/form-validations/FormikFields";
// import {Form,} from "formik";
// import Card from "reactstrap/src/Card";

class CommentsRow extends Component {
    constructor(props) {
        super(props);
        this.state={
            emoji:"like",
            seen:null
        }
    }
    componentDidMount(){
        let {Rate}=this.props.input;
        switch(Rate) {
            case 1:
                this.setState({
                    emoji:"sad"

                    // emoji:"love"
                });
                // code block
                break;
            case 2:
                this.setState({
                    emoji:"yay"
                });
                // code block
                break;
            case 3:
                this.setState({
                    emoji:"wow"

                });
                // code block
                break;
            case 4:
                this.setState({
                    emoji:"haha"
                });
                // code block
                break;
            case 5:
                this.setState({
                    emoji:"love"
                });
                // code block
                break;
            case 6:
                this.setState({
                    emoji:"like"
                });
                // code block
                break;
            case 0:
                this.setState({
                    emoji:"angry"

                    // emoji:"sad"
                });
                // code block
                break;
            default:
                this.setState({
                    emoji:"like"
                });
            // code block
        }

        this.setState({
            seen:this.props.input.Seen
        })
    }
    checkedFunc(){




        if (this.state.seen ===false){
            let headers = {
                'Token':`${Const.Token}`,
                'Id': `${Const.ID}`
            };
            let BODY={'CommentId': this.props.input.CommentId};


            axios.post(`${Const.Amin_URL}admin/comment/seen` ,BODY, {headers:headers}).then(responsive=>
            {
                // this.setState({
                //     loaderActive:false
                // });
                const {Description,State}=responsive.data;
                console.log(State);
                if(Description === "d"){
                    this.setState(prevState => ({
                        seen:true
                    }))
                    NotificationManager.success(
                        "congratulation",
                        "your categories added",
                        3000,
                        null,
                        null,
                        "success"
                    );
                }else {
                    NotificationManager.error(
                        " new game currency didnt add",
                        Description,
                        3000,
                        null,
                        null,
                        "success"
                    );
                }


                console.log(Description)
            }).catch(error=>{
                // this.setState({
                //     loaderActive:false
                // });
                console.log(error)});
        }



    }

    render() {
        let{accordion,toggleAccordion,index,input,Name}=this.props;
        let{emoji,seen}=this.state;
        // Comment: "غذا فاجعه بود "
        // CommentId: "5d4032b88a84408f13b365dd"
        // Created_at: "2019-07-30 16:36:16.968000"
        // Rate: 1
        // Seen: true
        // UserId: "ehsan"
        // console.log(input);
        return (
            <div className="border">
                <Button
                    block
                    color="link"
                    className="text-left"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={accordion}
                >
                    {/*<FormikCustomCheckbox*/}
                    {/*name="checkboxCustomSingle"*/}
                    {/*value={seen}*/}
                    {/*label=""*/}
                    {/*onChange={() => seen}*/}
                    {/*onBlur={() => seen}*/}
                    {/*/>*/}

                    <span className='d-flex align-content-center white ' onClick={this.checkedFunc.bind(this)}>
                        {

                            seen?<span className='dot-unselect mr-3'></span>:<span className='dot-select mr-2'></span>



                        }
                        {Name}
                        <span className="d-flex ml-auto ">
                        <FacebookEmoji type={emoji} size="xs"/>
                    </span>
                    </span>




                    {/*<span className="position-relative d-flex justify-content-end ">*/}

                </Button>
                <Collapse isOpen={accordion}>
                {/*<Collapse >*/}
                    <div className="p-4">
                        {input.Comment}
                    </div>
                </Collapse>
            </div>

        );
    }
}

export default CommentsRow;