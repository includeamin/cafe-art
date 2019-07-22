import React, {Component} from 'react';
import IntlMessages from "../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
import {TweenMax} from "gsap/TweenMax";
import RowShowShow from "../../RowShowShow";

var classNames = require('classnames');

class RowShowCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"title",
            Rank: 1,
            data:"97/8/7",
            // comment:25,
            // like:27,
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
    handelHover(){
        let liClasses = classNames({
            'card-img-top': true,
            'hoverImg': !this.state.imgHover
        });

        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,liClasses
        }));


        // console.log(this.state.hoverImg);
        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        TweenMax.to(button,0.5,{css:{ left:'40%',top:'30%',scale:3}});
    }
    handelHoveOut(){
        let liClasses = classNames({
            'card-img-top': true,
            'hoverImg': this.state.imgHover
            // 'hoverImg': true
        });

        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,
            liClasses
        }));
        // console.log(this.state.hoverImg);
        TweenMax.to(button,0.5,{css:{left:'0%',top:'0%',scale:1}});
    }

    render() {

        let { title, Rank,data,comment,like}=this.state;
        let {index , img}=this.props;
        return (
            <div className='w-100'>
                <Card>
                    <div className='d-flex justify-content-around mt-2 col-12'>
                        <div className='col-6'>
                            <div  className='d-flex justify-content-center mt-3'>
                                <IntlMessages id='image'/>
                            </div>
                            <img
                                src={img}
                                alt={index}
                                className='w-100 br05 m-2 imgHeight20vh'
                            />



                        </div>

                        <div className='col-6'>
                            <div  className='d-flex justify-content-center mt-3'>
                                <IntlMessages id='Icon'/>
                            </div>
                            <img
                                src={img}
                                alt={index}
                                className='w-100 br05 m-2 imgHeight20vh'
                            />

                        </div>
                    </div>
                    <div className='clearfix'></div>
                    <CardBody>
                        <div className="col-12 ">
                            <div className="col-12">
                                <RowShowShow label={"title"} value={title} />
                            </div>
                            <div className="col-12">
                                <RowShowShow label={"Rank"} value={Rank} />
                            </div>
                        </div>

                        <footer>
                            <p className="text-muted text-small mb-0 font-weight-light">
                                {data}
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
                        <Button color="primary" onClick={this.DeleteItem}>
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

export default RowShowCategories;