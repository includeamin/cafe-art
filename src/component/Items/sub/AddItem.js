import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle
} from "reactstrap";
import IntlMessages from "./../../../helpers/IntlMessages";
import {Colxx} from "../../../components/common/CustomBootstrap";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";

import {GetCategories} from './../../../URL/GET';
import CropComponent from "../../CropComponent";
import * as Const from "../../Const";
import SuggestCategoriesComponent from "../../SuggestCategoriesComponent";

// import {FormikCustomRadioGroup} from "../../../containers/form-validations/FormikFields";

// import {TweenMax} from "gsap/TweenMax";
// import {base64StringtoFile,
//     downloadBase64File,
//     extractImageFileExtensionFromBase64,
//     image64toCanvasRef} from './../../functions/Functions';
// import AutoSuggestEdit from "../AutoSuggestEdit";
// import Files from 'react-files'
// import MultiFiles from "../MultiFile/MultiFiles";
// import DropzoneExample from "../../../containers/forms/DropzoneExample";


// const imageMaxSize = 1000000000 // bytes
// const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
// const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});

const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Title  is required!"),
    Description: Yup.string()
        .required("Description  is required!"),
    Price: Yup.number()
        .required("Price number is required!"),

});

class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state={
            src: null, crop: '', imgIcon: null,
            src2: null, crop2: '', imgIcon2: null,suggest:null,fileName:null,
            categories:[],option:[],files:[],categoriesList:{}, categoriesId:null,
            categoriesName:null

        }
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

    GetSuggestValue(id, value) {
        console.log('id' + id)
        // console.log('value' + value)
        this.setState({
            categoriesId:id,
            categoriesName:value
        })
    }

    handleSubmit = (values, { setSubmitting }) => {
        // this.setState({
        //     loaderActive:true
        // });
        const payload = {
            ...values,

        };

        console.log(payload);
        let {crop2,crop,files,suggest,categoriesId,categoriesName}=this.state;
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        console.log('payload.Title:'+payload.Title+'payload.Price:'+payload.Price);

        let BODY={'Title': payload.Title,
            'RowId': categoriesId,
            'CategoryName':categoriesName,
            'Price':payload.Price,
            'MenuImageUrl': crop,
            'Description':payload.Description,
            'Gallery': files,
            'ItemImageUrl': crop2
        };

        axios.post(`${Const.Amin_URL}admin/item/add` ,BODY, {headers:headers}).then(responsive=>
        {
            // this.setState({
            //     loaderActive:false
            // });
            console.log(responsive)
            const {Description,State}=responsive.data;
            let DES=JSON.parse(Description);
            console.log(responsive)

            if(State){
                NotificationManager.success(
                    "congratulation",
                    "your categories added",
                    3000,
                    null,
                    null,
                    "success"
                );

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

                                    Title: "",Price:'',Description:''

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
                                                <SuggestCategoriesComponent label='دسته بندی' GetSuggestValue={this.GetSuggestValue.bind(this)}/>

                                            </div>
                                        </div>
                                        <div className="w-100 d-flex ">
                                            <div className="col-sm-12 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative">
                                                    <Label>
                                                        <IntlMessages id="توضیحات" />
                                                    </Label>
                                                    <Field className="form-control" name="Description" component="textarea" rows="6" />
                                                    {errors.Description && touched.Description ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.Description}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </div>

                                        </div>
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