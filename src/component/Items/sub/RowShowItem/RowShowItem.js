import React, {Component} from 'react';
import IntlMessages from "../../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
import {TweenMax} from "gsap/TweenMax";
import RowShowShow from "../../../RowShowShow";
import CarouselEdite from "../../CaruselEdite/CarouselEdite";
// import ReactSiemaCarousel from "../../../../components/ReactSiema/ReactSiemaCarousel";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import * as Const from "../../../Const";
import axios from "axios";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
// import ReactSiema from "./../../../../components/ReactSiema/lib";

var classNames = require('classnames');

// Gallery: (2) [{…}, {…}]
// ItemImageUrl: "menu_image_url_0"
// Likes: [{…}]
// LikesCount: 1
// MenuImageUrl: "image_url_0"
// RowId: 0
// Title: "item_0"
// _id: "5d2da0b7d74b103f12d75ddd"

class RowShowItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"title",
            Rank: 1,
            data:"97/8/7",
            comment:10,
            like:27,
            modal:false,
            imgHover:false,
            liClasses:classNames({
                // 'border-0': true,
                'col-5': true,

            })
        }
    }
    toggle = () => {
        console.log("toggel");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    DeleteItem(){
        let {_id}=this.props.input;

        let ItemId=_id;
        console.log(ItemId);

        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY = {
            'ItemId': ItemId,
        };

        axios.post(`${Const.Amin_URL}admin/item/delete` ,BODY, {headers:headers}).then(responsive=>
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

            console.log(Description)
        }).catch(error=>{
            // this.setState({
            //     loaderActive:false
            // });
            console.log(error)});
    }

    render() {

        let { title, Rank,data,comment,like}=this.state;
        let {index , input}=this.props;
        console.log(input._id);
        // console.log(index)

        // let {index , img}=this.props;
        return (
            <div className='w-100'>
                <Card>
                    <div className=' d-flex justify-content-between w-100  mt-2 col-12'>

                        <div className='col-6'>
                            <div className='d-flex justify-content-center mt-3'>
                                <IntlMessages id='Icon'/>
                            </div>
                            <img
                                src={input.ItemImageUrl}
                                alt={index}
                                className='w-100 br05 m-2 imgHeight20vh '
                            />
                        </div>

                        <div className='col-6'>
                            <div className='d-flex justify-content-center mt-3'>
                                <IntlMessages id='Image'/>
                            </div>
                            <img
                                src={input.MenuImageUrl}
                                alt={index}
                                className='w-100 br05 m-2 imgHeight20vh '
                            />
                        </div>

                    </div>


                    <div className='clearfix'></div>

                    <CardBody>
                        <div className="col-12 d-flex ">
                            <div className="col-6">
                                <RowShowShow label={"title"} value={input.Title} />
                            </div>
                            <div className="col-6">
                                <RowShowShow label={"categories"} value={input.RowId} />
                            </div>
                        </div>
                        <div className="col-12 d-flex mt-2">
                            <div className="col-6">
                                <RowShowShow label={"comment"} value={input.Comments?input.Comments.length:0} />
                            </div>

                            <div className="col-6">
                                <RowShowShow label={"like"} value={input.LikesCount} />
                            </div>
                        </div>
                        <div className="col-12 d-flex mt-2">
                            <div className="col-6">
                                <RowShowShow label={"price"} value={input.price} />
                            </div>


                        </div>
                        <CarouselEdite  data={input.Gallery}/>

                        {/*<footer>*/}
                            {/*<p className="text-muted text-small mb-0 font-weight-light">*/}
                                {/*{data}*/}
                            {/*</p>*/}
                        {/*</footer>*/}
                        <span
                            className=' badge-danger deleteBadge ' onClick={this.toggle}
                            // className={`badge badge-danger badge-${
                            //     'theme-2'
                            //     } position-absolute ${
                            //     "badge-top-left-4"
                            //     }`}
                        >
                  delete
                </span>
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

export default RowShowItem;