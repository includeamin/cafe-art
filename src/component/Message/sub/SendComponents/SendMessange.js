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
const imageMaxSize = 1000000000 ;// bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});



const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Title is required!"),
      Description: Yup.mixed()
        .nullable("Description string is required!"),

});

class SendMessange extends Component {
    constructor(props) {
        super(props);
        this.state={
            src: null, crop: '',imgIcon:null,
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
        let {crop}=this.state;


        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY={'Title': payload.Title,
            'RowId': payload.Rank,
            'IconUrl': crop,
            // 'ImageUrl': crop2
        };

        // axios.post(`${Const.Amin_URL}admin/categories/add` ,BODY, {headers:headers}).then(responsive=>
        // {
        //     // this.setState({
        //     //     loaderActive:false
        //     // });
        //     const {Description}=responsive.data;
        //     if(Description === "d"){
        //         NotificationManager.success(
        //             "congratulation",
        //             "your categories added",
        //             3000,
        //             null,
        //             null,
        //             "success"
        //         );
        //     }else {
        //         NotificationManager.error(
        //             " new game currency didnt add",
        //             Description,
        //             3000,
        //             null,
        //             null,
        //             "success"
        //         );
        //     }
        //
        //     // let DES=JSON.parse(Description);
        //     // this.props.inprogress(DES);x
        //     console.log(Description)
        // }).catch(error=>{
        //     // this.setState({
        //     //     loaderActive:false
        //     // });
        //     console.log(error)});


    };


    handelCrop = (src,crop,imgIcon) => {

        console.log(crop);

        this.setState({
            src,crop,imgIcon
        });

    };
    render() {


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
                                    Description:""
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

export default SendMessange;