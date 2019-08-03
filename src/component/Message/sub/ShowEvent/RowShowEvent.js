import React, {Component} from 'react';
import IntlMessages from "../../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
// import img from '../../../new/city.jpg';
import {TweenMax} from "gsap/TweenMax";
import RowShowShow from "../../../RowShowShow";
import * as Const from "../../../Const";
import axios from "axios";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import DeleteModal from "../../../DeleteModal";

var classNames = require('classnames');

class RowShowEvent extends Component {
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
    DeleteItem(){


        let EventId=this.props.input._id;
        console.log(EventId);




        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY = {
            'EventId': EventId,
        };

        axios.post(`${Const.Amin_URL}admin/event/remove` ,BODY, {headers:headers}).then(responsive=>
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
                let id=this.props.input._id;

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
        let {liClasses}=this.state;
        let {Title,Price,Description,Date,Capacity,ImageUrl,_id}=this.props.input;
        let {index }=this.props;

        return (
            <div className="col-12" dir='rtl' id={_id}>
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
                            src={ImageUrl}
                            alt={index}
                            className={liClasses}
                        />
                        <div >
                            <Button outline color={"white"} className="trashIconBox position-absolute"  onClick={this.toggle}
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

                        <div className="w-100 d-flex">
                            <div className="w-100 fontFamili12 marginZeroRL">
                                <RowShowShow label={"عنوان"} value={Title}/>
                            </div>
                        </div>
                        <div className="w-100 d-flex mt-3" >
                            <div className="col-6  fontFamili12 paddingZero" >
                                <RowShowShow label={"ظرفیت"} value={Capacity}/>
                            </div>
                            <div className="col-6  fontFamili12 paddingZero">
                                <RowShowShow label={"قیمت"} value={Price}/>
                            </div>
                        </div>
                        <div className="w-100 d-flex mt-3" >
                            <h6 className="mb-4 d-flex text-justify w-100" dir='rtl'>{Description}</h6>
                        </div>
                        <footer>
                            <p className="text-muted text-small mb-0 font-weight-light">
                                {Date}
                            </p>
                        </footer>
                    </CardBody>
                </Card>
                <DeleteModal toggle={this.toggle} handleDelete={this.DeleteItem.bind(this)} modal={this.state.modal} header={'حذف رخداد'}/>
                {/*<Modal isOpen={this.state.modal} toggle={this.toggle}>*/}
                    {/*<ModalHeader toggle={this.toggle}>*/}
                        {/*<IntlMessages id="Delete Item" />*/}
                    {/*</ModalHeader>*/}
                    {/*<ModalBody>*/}
                        {/*Are You Really fucking sure ?*/}
                    {/*</ModalBody>*/}
                    {/*<ModalFooter>*/}
                        {/*<Button color="primary" onClick={this.DeleteItem.bind(this)}>*/}
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

export default RowShowEvent;