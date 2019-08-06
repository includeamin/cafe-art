import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactCrop from 'react-image-crop';
import img2 from './../new/coffee.jpg'
import * as Const from "../Const";



import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup
} from "reactstrap";
import IntlMessages from "./../../helpers/IntlMessages";
import {Colxx} from "../../components/common/CustomBootstrap";
import {FormikCustomRadioGroup} from "../../containers/form-validations/FormikFields";
import NotificationManager from "../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import {base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef} from './../functions/Functions';
import CropComponent from "../CropComponent";
const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});

const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Kill number is required!"),
    Rank: Yup.number()
        .required("MatchType is required!"),
    // MatchName: Yup.string()
    //     .required("MatchName is required!"),
    // ImageUrl: Yup.string()
    //     .required("MatchName is required!"),
    // Scene: Yup.string()
    //     .required("Scene is required!"),
    // MatchTime: Yup.number()
    //     .required("MatchTime number is required!"),
    // Price: Yup.number()
    //     .required("Price number is required!"),
    // EXP: Yup.number()
    //     .required("Price number is required!"),
    // MaxPlayers: Yup.number()
    //     .required("Price number is required!"),
});

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null, crop: '', imgIcon: null,
            src2: null, crop2: '', imgIcon2: null,
        }
    }
    onSubmit= e => {

        let {crop2,crop}=this.state;
        console.log('crop: '+crop)
        console.log('crop2: '+crop2)


    };
    handelCrop = (src,crop,imgIcon) => {

        console.log(crop);

        this.setState({
            src,crop,imgIcon
        });


    };
    handelCrop2 = (src2,crop2,imgIcon2) => {

        console.log(crop2);

        this.setState({
            src2,crop2,imgIcon2
        });


    };
    handleSubmit = (values, { setSubmitting }) => {
        // this.setState({
        //     loaderActive:true
        // });
        const payload = {
            ...values,
            // TypeKind: values.TypeKind.value
            // Names: values.Names.value,
        };
        console.log(payload);
        let {crop2,crop}=this.state;


        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY={'Title': payload.Title,
            'RowId': payload.Rank,
            'IconUrl': crop,
            'ImageUrl': crop2
        };
        let form = new FormData();
        form.append('Title', payload.Title);
        form.append('RowId', payload.Rank);
        form.append('IconUrl', crop);
        form.append('ImageUrl', crop2);
        // form.append('SKU', payload.SKU);
        // form.append('Name', payload.Name);
        axios.post(`${Const.Amin_URL}admin/categories/add` ,BODY, {headers:headers}).then(responsive=>
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
        const { crop, croppedImageUrl, src,crop2, croppedImageUrl2, src2 } = this.state;

        return (

                // this.state.loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
                <Row className="mb-4" style={{fontSize:18+'px'}} dir='rtl'>
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <CardTitle className='float-right'>
                                    <IntlMessages id="اضافه کردن دسته بندی جدید" />
                                </CardTitle>

                                <Formik
                                    initialValues={{

                                        Title: "",
                                        Rank:"",
                                        // ImageUrl:"TimeTrial",
                                        // Scene:"city",
                                        // Kill: 0,
                                        // MatchTime: 190,
                                        // Price: 245,
                                        // EXP: 0,
                                        // MaxPlayers: 2,
                                        // state: {}
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
                                                <div className="col-sm-6 rowInput">
                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <IntlMessages id="عنوان" />
                                                        </Label>
                                                        <Field className="form-control" name="Title"  />
                                                        {errors.Title && touched.Title ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.Title}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-6 rowInput">
                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <IntlMessages id="رتبه" />
                                                        </Label>
                                                        <Field className="form-control" name="Rank" type="number"  />
                                                        {errors.Rank && touched.Rank ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.Rank}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                            </div>

                                            <div>

                                                <div className="w-100 d-flex ">
                                                    <div className="col-6">
                                                        <CropComponent label={'آیکون'} onCropImg={this.handelCrop}/>
                                                    </div>
                                                    <div  className="col-6">
                                                        <CropComponent label={'عکس'} onCropImg={this.handelCrop2}/>
                                                    </div>
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

export default Categories;