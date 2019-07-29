import React, {Component} from 'react';
import FacebookEmoji from 'react-facebook-emoji';
import IntlMessages from "../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
import {TweenMax} from "gsap/TweenMax";
import * as Const from "../../Const";
import axios from "axios";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";

var classNames = require('classnames');


class RowShowComments extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"title",
            name:"ehsan",
            detail:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet " +
                "bibendum enim. In massa tempor nec feugiat. Nunc aliquet bibendum enim facilisis gravida. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. " +
                "Amet luctus venenatis lectus magna fringilla. Volutpat maecenas volutpat blandit aliquam etiam erat" +
                " velit scelerisque in. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Sagittis orci a ",
            data:"97/6/2019",
            emoji:"like",
            seen:true
        }
    }
    componentDidMount(){
        let {index}=this.props;
        switch(index) {
            case 1:
                this.setState({
                    emoji:"love"
                });
                // code block
                break;
            case 2:
                this.setState({
                    emoji:"wow"
                });
                // code block
                break;
            case 3:
                this.setState({
                    emoji:"yay"
                });
                // code block
                break;
            case 4:
                this.setState({
                    emoji:"angry"
                });
                // code block
                break;
            case 5:
                this.setState({
                    emoji:"haha"
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
                    emoji:"sad"
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
            seen:this.props.input.seen
        })
    }
    checkedFunc(){


        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
// console.log(this.props.input.CommentId)

        let BODY={'CommentId': this.props.input.CommentId};


        axios.post(`${Const.Amin_URL}admin/comment/seen` ,BODY, {headers:headers}).then(responsive=>
        {
            // this.setState({
            //     loaderActive:false
            // });
            const {Description}=responsive.data;
            if(Description === "d"){
                this.setState(prevState => ({
                    seen:!prevState.seen
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

    render() {
        let{index,Name,input}=this.props ;
        let {title,name,detail,data,emoji,item,seen}=this.state;
        console.log(input);

        return (
            <div className="col-12">
                <Card>
                 <div className="position-relative d-flex justify-content-center mt-2">
                     <FacebookEmoji type={emoji} size="xl"/>
                 </div>
                    <CardBody>
                        <div className="d-flex">
                            {/*<div className="mr-auto" >*/}
                                {/*<span>{name}: </span><h4 className="mb-4">{title}</h4>*/}
                            {/*</div>*/}
                            <div >
                                <span>item: </span><h4 className="mb-4">{Name}</h4>
                            </div>
                        </div>

                        <h6 className="mb-4 d-flex text-justify">{input.Comment}</h6>
                        <footer>
                            <p className="text-muted text-small mb-0 font-weight-light float-left">
                                {input.Created_at.slice(0,10)}
                            </p>
                            <div className='float-right'>
                                {
                                    seen?<button className='btn disabled' >مشاهده شده</button>:<button className='btn btn btn-success' onClick={this.checkedFunc.bind(this)}>مشاهده شود</button>
                                }
                            </div>
                        </footer>
                    </CardBody>
                </Card>
                {/*<Modal isOpen={this.state.modal} toggle={this.toggle}>*/}
                    {/*<ModalHeader toggle={this.toggle}>*/}
                        {/*<IntlMessages id="Delete Item" />*/}
                    {/*</ModalHeader>*/}
                    {/*<ModalBody>*/}
                        {/*Are You Really fucking sure ?*/}
                    {/*</ModalBody>*/}
                    {/*<ModalFooter>*/}
                        {/*<Button color="primary" onClick={this.DeleteItem}>*/}
                            {/*Delete Item*/}
                        {/*</Button>{" "}*/}
                        {/*<Button color="secondary" onClick={this.toggle}>*/}
                            {/*Cancel*/}
                        {/*</Button>*/}
                    {/*</ModalFooter>*/}
                {/*</Modal>*/}

            </div>

        );
    }
}

export default RowShowComments;