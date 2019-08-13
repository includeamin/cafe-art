import React, {Component} from 'react';
import IntlMessages from "../../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
// import img from '../../../new/city.jpg';
import {TweenMax} from "gsap/TweenMax";
import * as Const from "../../../Const";
import axios from "axios";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";

var classNames = require('classnames');


class RowShowMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }
    toggle = () => {
        console.log("toggel");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };


    DeleteItem(){


        let NotificationId=this.props._id;

        console.log(NotificationId);
        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY = {
            'NotificationId': NotificationId,
        };

        axios.post(`${Const.Amin_URL}admin/notification/delete` ,BODY, {headers:headers}).then(responsive=>
        {
            // this.setState({
            //     loaderActive:false
            // });
            const {Description}=responsive.data;

            if(Description === "d"){
                NotificationManager.success(
                    "congratulation",
                    "your categories added",
                    3000,
                    null,
                    null,
                    "success"
                );
                // setTimeout(function(){ window.location.reload(); }, 3000);
                let id=this.props._id;
                const $el = document.getElementById(`${id}`);
                const duration = 2;
                const from = { opacity: 0};
                TweenMax.to($el, duration, from);
                this.toggle();
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

            // let DES=JSON.parse(Description);
            // this.props.inprogress(DES);x
            console.log(Description)
        }).catch(error=>{
            // this.setState({
            //     loaderActive:false
            // });
            console.log(error)});
    }

    render() {


        let {index,Date,Description,Title,_id }=this.props;
        return (
            <div className="col-12" id={_id}>
                <Card>
                        <div  className="position-relative">
                            <div >
                                <Button outline  className="trashIconBox2 position-absolute "  onClick={this.toggle}
                                        id={`button ${index}`}>
                                    <i className="simple-icon-trash"/>
                                </Button>
                            </div>

                        </div>

                    <CardBody>
                        <h4 className="mb-4">{Title}</h4>
                        <h6 className="mb-4 d-flex text-justify">{Description}</h6>
                        <footer>
                            <p className="text-muted text-small mb-0 font-weight-light">
                                {Date}
                            </p>
                        </footer>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        <IntlMessages id="Delete Item" />
                    </ModalHeader>
                    <ModalBody>
                        Are You Really fucking sure ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.DeleteItem.bind(this)}>
                            Delete Item
                        </Button>{" "}
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>

        );
    }

}

export default RowShowMessage;