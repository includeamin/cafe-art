import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactCrop from 'react-image-crop';
import img2 from './../../new/coffee.jpg';


import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup
} from "reactstrap";
import IntlMessages from "./../../../helpers/IntlMessages";
import {Colxx} from "../../../components/common/CustomBootstrap";
import {FormikCustomRadioGroup} from "../../../containers/form-validations/FormikFields";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import {base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef} from './../../functions/Functions';

import {GetCategories} from './../../../URL/GET';

import AutoSuggestEdit from "../AutoSuggestEdit";
import CropComponent from "../../CropComponent";
import * as Const from "../../Const";
import Files from 'react-files'
import MultiFiles from "../MultiFile/MultiFiles";
import DropzoneExample from "../../../containers/forms/DropzoneExample";

const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});

const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Title number is required!"),
    Price: Yup.number()
        .required("Price number is required!"),

});

class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state={
            src: null, crop: '', imgIcon: null,
            src2: null, crop2: '', imgIcon2: null,suggest:null,fileName:null,
            categories:[],option:[],files:[],categoriesList:{}
        }
    }
    componentDidMount(){
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        // let categories=[
        //     {RowId:1,Title:'صبحانه'},
        //     {RowId:2,Title:'ناهار'},
        //     {RowId:3,Title:'شام'},
        //     {RowId:4,Title:'عصرانه'},
        // ];
        // let index;
        //
        //
        // let  option=[];
        // categories.map(item => {
        //     option.push({name: item.Title})
        // });
        // console.log(option)
        //
        // let categoriesList = {};
        //
        // for (index in categories){
        //     let id =categories[index].Title;
        //     let Value =categories[index].RowId;
        //     // dict[id] = Value;
        //     categoriesList[Value] = id;
        // }
        //
        // this.setState({
        //     categoriesList,categories,option
        // })
        // console.log(categoriesList);






        axios.get(`${Const.Amin_URL}categories` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            console.log(Description);
            let categories=JSON.parse(Description);
            let index;


            let  option=[];
            categories.map(item => {
                option.push({name: item.Title})
            });
            console.log(option)

            let categoriesList = {};

            for (index in categories){
                let id =categories[index].Title;
                let Value =categories[index].RowId;
                // dict[id] = Value;
                categoriesList[Value] = id;
            }

            this.setState({
                categoriesList,categories,option
            })
            console.log(categoriesList);

            // (5) [{…}, {…}, {…}, {…}, {…}]
            // 0: {Created_at: "2019-07-23 13:32:25.951000", IconUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…zXSpG8piLRgVsK1UrflWo5VmkHoKkBUZFLVSqysUBmsoky//Z", ImageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…gPpyreKSuIkpBSDkj2pxKiRyoj6ZrFBaQvnOcdzTSE/mWX//Z", RowId: 1, Title: "wfphki", …}
            // 1: {Created_at: "2019-07-23 12:29:40.337000", IconUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…hNkggb1JX5JuFg8jXnKWpllamzggAj19R76zWazTUUHX/2Q==", ImageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…lEz7gqrGu6y++Mwky6Y0srQwIiqV3kkXN/wB8ZiH5cSwE/9k=", RowId: 2, Title: "ناهار", …}
            // 2: {Created_at: "2019-07-23 17:50:31.736000", IconUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…xSiQTxyR6U6v8lHpv/sI/vK/xpzrLtPcQQuT+kHprcjmf/9k=", ImageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…AqawHlReHy48/woodXMy6lEqlEg8lG3xiONPfSbFZ9I//2Q==", RowId: 3, Title: "شام ", …}
            // 3: {Created_at: "2019-07-23 13:35:42.297000", IconUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…1ZemuiKysqRpuFXalWfZP2SPoKl0Dt9Kysqdp+FW6v4l//9k=", ImageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…xzCbn03v6DGY9y4XGowZ1G6ynTZWycZhEAkzUV5tBcUSK/9k=", RowId: 4, Title: "ناهار", …}
            // 4: {Created_at: "2019-07-23 17:51:44.268000", IconUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…/AEA5UcGpSYSHBufGD0AAzUZr8afyooj8A+5qp7t10Cl//9k=", ImageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…uOuqpNeozRpj3BSk4Us1xhU23G1ChQq5tvS6LK+7rz94r/9k=", RowId: 6, Title: "میان وعده", …}
            // length: 5

            // console.log(this.state.modes);

        }).catch(error=>{console.log(error)});
         console.log(this.state.categories)

    }
    handelCrop = (src,crop,imgIcon) => {

        // console.log(crop);

        this.setState({
            src,crop,imgIcon
        });

    };
    handelCrop2 = (src2,crop2,imgIcon2) => {

        // console.log(crop2);

        this.setState({
            src2,crop2,imgIcon2
        });


    };
    handelSuggestValue=(value)=>{
        this.setState({suggest:value});
    };
    MultiFile(files){
        this.setState({
            files
        })
        // console.log(files)
    }
    handleSubmit = (values, { setSubmitting }) => {
        // this.setState({
        //     loaderActive:true
        // });
        const payload = {
            ...values,

        };

        console.log(payload);
        let {crop2,crop,files,suggest,categoriesList}=this.state;
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }
        let itm=getKeyByValue(categoriesList,suggest);
        console.log(itm);

        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        console.log('payload.Title:'+payload.Title+'payload.Price:'+payload.Price);

        let BODY={'Title': payload.Title,
            'RowId': suggest,
            'Price':payload.Price,
            'MenuImageUrl': crop,
            'Gallery': files,
            'ItemImageUrl': crop2
        };
        let form = new FormData();
        form.append('Title', payload.Title);
        form.append('RowId', payload.Rank);
        form.append('IconUrl', crop);
        form.append('ImageUrl', crop2);
        // form.append('SKU', payload.SKU);
        // form.append('Name', payload.Name);
        axios.post(`${Const.Amin_URL}admin/item/add` ,BODY, {headers:headers}).then(responsive=>
        {
            // this.setState({
            //     loaderActive:false
            // });
            const {Description,State}=responsive.data;
            let DES=JSON.parse(Description);

            if(State){
                NotificationManager.success(
                    "congratulation",
                    "your categories added",
                    3000,
                    null,
                    null,
                    "success"
                );
                // "_id": "<pymongo.results.InsertOneResult object at 0x7f359c638b08>",
                //     "name": "we"

                console.log('id: '+DES._id);
                console.log('name: '+DES.name);
                this.props.handelGoTwoStep2(DES._id,DES.name);
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





        console.log('crop'+crop);
        console.log('crop2'+crop2);

        console.log('suggest'+suggest);
        // console.log('files'+files[0]);
        console.log('files'+files.length);
        console.log('files'+files);
    };
    render() {
        const { crop, croppedImageUrl, src,crop2, croppedImageUrl2, src2 ,option} = this.state;
        // const option=[{'name':'breakfast'},{'name':'dinner'},{'name':'lunch'},{'name':'hot drink'},{'name':'cold Drink'}];

        return (

            // this.state.loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
            <Row className="mb-4" style={{fontSize:19+'px'}}  dir='rtl' >
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle className='float-right'>
                                <IntlMessages id="ایجاد ارقام " />
                            </CardTitle>

                            <Formik
                                initialValues={{

                                    Title: "",Price:''

                                }}
                                validationSchema={SignupSchema}
                                onSubmit={this.handleSubmit.bind(this)}
                            >
                                {({
                                      handleSubmit,
                                      setFieldValue,
                                      setFieldTouched,
                                      handleChange,
                                      handleBlur,
                                      values,
                                      errors,
                                      touched,
                                      isSubmitting
                                  }) => (
                                    <Form className="av-tooltip tooltip-label-bottom d-flex col-12 flex-column">
                                        <div className="w-100 d-flex ">
                                            <div className="col-sm-4 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative ">
                                                    <Label  >
                                                        <IntlMessages id="عنوان"  />
                                                    </Label>
                                                    <Field className="form-control fontSizeInputText " name="Title"  />
                                                    {errors.Title && touched.Title ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.Title}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-4 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative">
                                                    <Label>
                                                        <IntlMessages id="قیمت" />
                                                    </Label>
                                                    <Field className="form-control fontSizeInputText " name="Price" type='number' />
                                                    {errors.Price && touched.Price ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.Price}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-4 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative ">
                                                    <Label>
                                                        <IntlMessages id="دسته بندی" />
                                                    </Label>
                                                    <AutoSuggestEdit
                                                        placeholder = {"type item name"}
                                                        data={option}
                                                        onChange={value => {this.handelSuggestValue(value)}}

                                                        // onChange={value => {this.setState({value})}}
                                                    />
                                                </FormGroup>
                                            </div>
                                        </div>

                                        {/*<div className="col-12 d-flex  ">*/}
                                                    {/*<MultiFiles MultiFile={this.MultiFile.bind(this)}/>*/}
                                        {/*</div>*/}

                                        <div className="w-100 d-flex mt-3 ">
                                            <div className="col-6">
                                                <CropComponent label={'آیکون'} onCropImg={this.handelCrop}/>
                                            </div>
                                            <div  className="col-6">
                                                <CropComponent label={'عکس'} onCropImg={this.handelCrop2}/>
                                            </div>
                                        </div>



                                        <Button color="primary" type="submit" className="col-2 rowInput">
                                            ارسال
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </CardBody>


                    </Card>

                </Colxx>

            </Row>


        );
    }
}

export default AddItem;