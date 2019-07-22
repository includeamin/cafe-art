import React, {Component} from 'react';
import IntlMessages from "../../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
// import img from '../../../new/city.jpg';
import {TweenMax} from "gsap/TweenMax";

var classNames = require('classnames');


class RowShowMessage extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"title",
            detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore " +
                "et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim. In massa tempor nec feugiat. " +
                "Nunc aliquet bibendum enim facilisis gravida. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper." +
                " Amet luctus venenatis lectus magna fringilla. Volutpat maecenas volutpat blandit aliquam etiam erat velit" +
                " scelerisque in. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Sagittis orci a ",

            data:"97/8/7",
            modal:false,
            imgHover:false,
            liClasses:classNames({
                // 'border-0': true,
                'card-img-top': true,

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
        let { title, detail,data,liClasses}=this.state;
        let {index , img}=this.props;
        return (
            <div className="col-12">
                <Card>
                        <div onMouseEnter={this.handelHover.bind(this)} onMouseLeave={this.handelHoveOut.bind(this)} className="position-relative">
                            {/*<div className="position-absolute card-top-buttons" onClick={this.toggle}>*/}
                            {/*<Button outline color={"white"} className="icon-button"   id={`button ${index}`}>*/}
                            {/*<i className="simple-icon-trash" />*/}
                            {/*</Button>*/}
                            {/*</div>*/}
                            {/*<img*/}
                            {/*src={img}*/}
                            {/*alt="Detail"*/}
                            {/*className={liClasses}*/}
                            {/*/>*/}

                            <img
                                src={img}
                                alt={index}
                                className={liClasses}
                            />
                            <div >
                                <Button outline color={"white"} className="trashIconBox position-absolute   "  onClick={this.toggle}
                                        id={`button ${index}`}>
                                    <i className="simple-icon-trash"/>
                                </Button>
                            </div>

                        </div>
                        {/*<img className="col-sm-12  imgheight" src={img} alt={title} />*/}

                        {/*{badges &&*/}
                        {/*badges.map((b, index) => {*/}
                        {/*return (*/}
                        {/*<span*/}
                        {/*key={index}*/}
                        {/*className={`badge badge-pill badge-${*/}
                        {/*b.color*/}
                        {/*} position-absolute ${*/}
                        {/*index === 0*/}
                        {/*? "badge-top-left"*/}
                        {/*: "badge-top-left-" + (index + 1)*/}
                        {/*}`}*/}
                        {/*>*/}
                        {/*{b.title}*/}
                        {/*</span>*/}
                        {/*);*/}
                        {/*})}*/}
                    <CardBody>
                        <h4 className="mb-4">{title}</h4>
                        <h6 className="mb-4 d-flex text-justify">{detail}</h6>
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

export default RowShowMessage;