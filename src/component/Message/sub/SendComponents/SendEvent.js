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
    CardTitle,
} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";

import CropComponent from "../../../CropComponent";
import * as Const from "../../../Const";
import Jalali from "../Jalali";
import JalaliComponent from "../JalaliComponent";
import PersianCalender from "../PersianCalender";
import PersianClassCalender from "../PersianClassCalender";

const imageMaxSize = 1000000000 ;// bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});



const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Title is required!"),
    price: Yup.number()
        .required("price is required!"),
    capacity: Yup.number()
        .required("capacity is required!"),
    Description: Yup.mixed()
        .nullable("Description string is required!"),
    // Date: Yup.mixed()
    //     .nullable("Description string is required!"),

});

// URL /admin/event/add
// METHOD POST
// HEADER Id Token
// BODY Title ImageUrl Description Date Price Capacity
// RESPONSE :
//     - Success : d
// ERRORS

class SendEvent extends Component {
    constructor(props) {
        super(props);
        this.state={
            src: null, crop: '',imgIcon:null,Date:null
        }
    }
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
        let {crop,Date}=this.state;


        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };


        let BODY={'Title': payload.Title,
            'Description': payload.Description,
            'Price': payload.price,
            'Capacity': payload.capacity,
            'ImageUrl':crop,
            'Date':Date,
        };
        // console.log(BODY)


        // BODY Title ImageUrl Description Date Price Capacity

        // let form = new FormData();
        // form.append('Title', payload.Title);
        // form.append('RowId', payload.Rank);
        // form.append('IconUrl', crop);

        axios.post(`${Const.Amin_URL}admin/event/add` ,BODY, {headers:headers}).then(responsive=>
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
    GetData(Data){
        // console.log(Data)
        if (Data!==null){
            let date=`${Data.year}/${Data.month}/${Data.day}`;
            console.log(date);
            this.setState({
                Date: date
            });

        }
        // console.log(date)

    }

    handelCrop = (src,crop,imgIcon) => {

        console.log(crop);

        this.setState({
            src,crop,imgIcon
        });

    };

    render() {

        const { crop, croppedImageUrl, src } = this.state;

        return (
            <Row className="mb-4" style={{fontSize:16+'px'}}>
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="Add-Notifications" />
                            </CardTitle>

                            <Formik
                                initialValues={{

                                    Title: "",
                                    Description:"",
                                    price:0,
                                    capacity:0
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
                                                        <IntlMessages id="Title" />
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
                                                        <IntlMessages id="date" />
                                                    </Label>
                                                    <div >
                                                        {/*<PersianCalender GetData={this.GetData.bind(this)}/>*/}
                                                        <PersianClassCalender GetData={this.GetData.bind(this)}/>
                                                    </div>

                                                    {/*<Field className="form-control" name="Title"  />*/}
                                                    {/*{errors.Title && touched.Title ? (*/}
                                                        {/*<div className="invalid-feedback d-block">*/}
                                                            {/*{errors.Title}*/}
                                                        {/*</div>*/}
                                                    {/*) : null}*/}
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="w-100 d-flex ">
                                            <div className="col-sm-6 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative">
                                                    <Label>
                                                        <IntlMessages id="price" />
                                                    </Label>
                                                    <Field className="form-control" name="price" type='number'  />
                                                    {errors.price && touched.price ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.price}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-6 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative">
                                                    <Label>
                                                        <IntlMessages id="capacity" />
                                                    </Label>
                                                    <Field className="form-control" name="capacity" type='number'  />
                                                    {errors.capacity && touched.capacity ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.capacity}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </div>
                                        </div>


                                        <div className="w-100 d-flex ">
                                            <div className="col-sm-12 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative">
                                                    <Label>
                                                        <IntlMessages id="Description" />
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
                                        <div className="w-100 d-flex ">

                                            <div className="col-6">
                                                <CropComponent label={'icon'} onCropImg={this.handelCrop}/>
                                            </div>

                                        </div>
                                        <Button color="primary" type="submit" className="col-2 rowInput">
                                            Submit
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

export default SendEvent;