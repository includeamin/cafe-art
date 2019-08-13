import React, {Component} from 'react';

import {
    Card,
    Button,
    Collapse,
    FormGroup,
    Label,
    Form,
    Input,
    Badge,
    CustomInput
} from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import * as Const from "../../../../Const";
import axios from "axios";


export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.expanded || false,
            title: this.props.title || "",
            question: this.props.question || "",

        };
    }
    toggleClick = () => {
        this.setState({ collapse: !this.state.collapse });
    };
    handelSubmit=(e)=>{
        e.preventDefault();
        let{title,question}=this.state;
               let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY={'PrevPassword': title,
            'NewPassword': question,
                };
        console.log(BODY);

        axios.post(`${Const.Amin_URL}admin/pass/reset` ,BODY, {headers:headers}).then(responsive=>
        {
            // console.log(responsive)
            // this.setState({
            //     loaderActive:false
            // });
            const {Description}=responsive.data;
            if(Description === "d"){

            }else {

            }


            console.log(Description)
        }).catch(error=>{
            // this.setState({
            //     loaderActive:false
            // });
            console.log(error)});
    }
    render() {
        return (
            <Card className={` d-flex`}>
                <div className="d-flex  min-width-zero  justify-content-between">
                    <div className=" align-self-center d-flex  min-width-zero align-items-md-center">
                        {/*<div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1 d-flex ">*/}
                        <div className=" mb-0  d-flex m-1 fontFamimily13vw ">
                            {/*<div className='fontFamimily11em'></div>*/}
                            تغییر رمز عبور
                        </div>
                    </div>
                    <div className="  d-flex ">
                        <Button
                            outline
                            color={"theme-3"}
                            className={`icon-button ml-1 rotate-icon-click   ${
                                this.state.collapse ? "rotate" : ""
                                }`}
                            onClick={this.toggleClick}
                        >
                            <i className="simple-icon-arrow-down" />
                        </Button>

                    </div>
                </div>

                <Collapse isOpen={this.state.collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
                            <div >
                                <FormGroup>
                                    <Label>پسورد قبلی</Label>
                                    <Input
                                        type="text"
                                        value={this.state.title}
                                        onChange={event => {
                                            this.setState({ title: event.target.value });
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>پسورد جدید</Label>
                                    <Input
                                        type="text"
                                        value={this.state.question}
                                        onChange={event => {
                                            this.setState({ question: event.target.value });
                                        }}
                                    />
                                </FormGroup>
                                <Button color="primary" className="mt-4 pl-5 pr-5" onClick={this.handelSubmit.bind(this)}>
                                    <IntlMessages id="تغییر رمز عبور" />
                                </Button>                                {/*<div className="separator mb-4 mt-4" />*/}
                            </div>
                        </div>

                    </div>
                </Collapse>
            </Card>
        );
    }
}
