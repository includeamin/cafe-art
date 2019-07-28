import React, {Component} from 'react';
import * as Const from "../../Const";
import axios from "axios";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import IntlMessages from "../../../helpers/IntlMessages";

import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";

class LiShowGallery extends Component {
    constructor(props) {
        super(props);
        this.state={
            modal:false,

        }
    }

    toggle = () => {
        // console.log("toggel");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    handleDelete(){


        let ItemId=this.props.itemId;
        let GalleryImageId=this.props.id;




        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY = {
            'ItemId': ItemId,
            'GalleryImageId': GalleryImageId,
        };

        axios.post(`${Const.Amin_URL}admin/item/gallery/image/delete` ,BODY, {headers:headers}).then(responsive=>
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
                setTimeout(function(){ window.location.reload(); }, 3000);

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
        let {src,index,classname}=this.props;
        return (
            <div className=''>
                <Card className={classname}>
                <img src={src} alt={index} className='imagheight40vh' />
                <span
                    className=' badge-danger deleteBadge' onClick={this.toggle}
                    // className={`badge badge-danger badge-${
                    //     'theme-2'
                    //     } position-absolute ${
                    //     "badge-top-left-4"
                    //     }`}
                >
                  delete
                </span>
                </Card>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        <IntlMessages id="Delete Item" />
                    </ModalHeader>
                    <ModalBody>
                        Are You Really fucking sure ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={ this.handleDelete.bind(this)}>
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

export default LiShowGallery;