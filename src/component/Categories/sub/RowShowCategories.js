import React, {Component} from 'react';
import IntlMessages from "../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
import {TweenMax} from "gsap/TweenMax";
import RowShowShow from "../../RowShowShow";
import * as Const from "../../Const";
import axios from "axios";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import {gregorian_to_jalali
} from './../../functions/Functions';
import DeleteModal from "../../DeleteModal";
import RowEditItem from "../../Items/sub/RowShowItem/RowEditItem";
import AddGalleryItem from "../../Items/twoStepAddItem/AddGalleryItem";
import RoweditCategories from "./RoweditCategories";

var classNames = require('classnames');

class RowShowCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"title",
            Rank: 1,
            newDateCreate:null,edit:true,
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
        // console.log("toggel");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    componentDidMount() {
        let {Created_at}=this.props.input;
        let Date=Created_at.slice(0,10);
        let array = Date.split("-");
        let ss=gregorian_to_jalali(array[0],array[1],array[2]);
        let newDateCreate=ss.join("-");
        this.setState({
            newDateCreate
        })
    }
    handleDelete(){


        let RowId=this.props.input.RowId;
        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY = {
            'RowId': RowId,
        };

        // form.append('SKU', payload.SKU);
        // form.append('Name', payload.Name);
        axios.post(`${Const.Amin_URL}admin/categories/delete` ,BODY, {headers:headers}).then(responsive=>
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
                const $el = document.getElementById(`${RowId}`);
                const duration = 2;
                const from = { opacity: 0};
                TweenMax.to($el, duration, from);
                this.toggle()
                // setTimeout(function(){ window.location.reload(); }, 3000);

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
        // console.log();
    }
    handelEdit(){
        this.setState(prevState => ({
            edit:!prevState.edit
        }))
        let id='editComponent';
        const $el = document.getElementById(`${id}`);
        // console.log($el)
        const duration = 2;
        const from = { opacity: 0};
        TweenMax.to($el, duration, from);
        // setTimeout(() => {
        //     $el.remove();
        // }, 2000)

    }

    GetBackToMain(value){
        console.log('value:  '+value)
        if (value === true){
            console.log('we edit some fechture');
            window.location.reload()

        } else {
            this.setState({
                edit:true
            })
            console.log('we didnt edit some fechture');
        }
    }

    render() {

        let { Title, RowId,IconUrl,ImageUrl,Created_at}=this.props.input;
        let{newDateCreate,edit}=this.state;
        console.log(this.props.input.RowId);
        console.log(this.props.input._id);

        let {index}=this.props;
        return (
            <div>
                {
                    edit === true ?
                        <div className='w-100' id={RowId} dir='rtl'>
                            <Card>
                                <div className='d-flex justify-content-around mt-2 col-12'>
                                    <div className='col-6'>
                                        <div className='d-flex justify-content-center mt-3'>
                                            <IntlMessages id='عکس'/>
                                        </div>
                                        <img
                                            src={IconUrl}
                                            alt={index}
                                            className='w-100 br05 m-2 imgHeight20vh'
                                        />


                                    </div>

                                    <div className='col-6'>
                                        <div className='d-flex justify-content-center mt-3'>
                                            <IntlMessages id='آیکون'/>
                                        </div>
                                        <img
                                            src={ImageUrl}
                                            alt={index}
                                            className='w-100 br05 m-2 imgHeight20vh'
                                        />

                                    </div>
                                </div>
                                <div className='clearfix'></div>
                                <CardBody>
                                    <div className="col-12 ">
                                        <div className="col-12">
                                            <RowShowShow label={"عنوان"} value={Title}/>
                                        </div>
                                        <div className="col-12">
                                            <RowShowShow label={"رتبه"} value={RowId}/>
                                        </div>
                                        <div className="col-12">
                                            <RowShowShow label={"تاریخ"} value={newDateCreate}/>
                                        </div>
                                    </div>

                                    {/*<footer>*/}
                                    {/*<p className="text-muted text-small mb-0 font-weight-light float-right ">*/}
                                    {/*{Created_at}*/}
                                    {/*</p>*/}
                                    {/*</footer>*/}
                                </CardBody>
                                <span className=' badge-danger deleteBadge' onClick={this.toggle}>حذف</span>
                                <span className=' badge-warning editBadge2' onClick={this.handelEdit.bind(this)}>
                                         ویرایش
                                    </span>
                            </Card>
                            <DeleteModal modal={this.state.modal} toggle={this.toggle}
                                         handleDelete={this.handleDelete.bind(this)} header={'حذف دسته بندی'}/>

                        </div>
                        :
                        <div className='w-100' id='editComponent'>
                            <RoweditCategories Title={Title} Rank={RowId} id={this.props.input._id}

                                         GetBackToMain={this.GetBackToMain.bind(this)}/>

                        </div>
                }
            </div>




        );
    }
}

export default RowShowCategories;