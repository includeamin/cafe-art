import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactCrop from 'react-image-crop';
import img2 from './../new/coffee.jpg'


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
        this.state={
            src: null, crop: '',imgIcon:null,
            src2: null, crop2: '',imgIcon2:null,
        }
          }







    onSubmit= e => {
        // e.preventDefault();
        // let {croppedImageUrl,croppedImageUrl2} = this.state;
        // // console.log(this.state.src);
        // console.log(croppedImageUrl);
        // console.log(croppedImageUrl2);
        // let file = 'ehsan';
        // // base64StringtoFile(croppedImageUrl, file);
        // // downloadBase64File(croppedImageUrl, file);
        // let ext = extractImageFileExtensionFromBase64(croppedImageUrl);
        // let ext2 = extractImageFileExtensionFromBase64(croppedImageUrl2);
        // console.log(ext);
        // console.log(ext2);
        // console.log(ext);
        // console.log(fileasbase64);

        let {crop2,crop}=this.state;
        console.log('crop: '+crop)
        console.log('crop2: '+crop2)



        //
        // const {imgSrc}  = this.state
        // if (imgSrc) {
        //     // const canvasRef = this.imagePreviewCanvasRef.current;
        //
        //     const {imgSrcExt,src} =  this.state;
        //     const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt);
        //     const myFilename = "previewFile." + imgSrcExt;
        //     // file to be uploaded
        //     const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
        //     console.log(myNewCroppedFile);
        //     console.log(canvasRef);
        //     downloadBase64File(imageData64, myFilename);
        //     this.handleClearToDefault()
        // }
    };
    handelCrop = (src,crop,imgIcon) => {

        console.log(crop);

        this.setState({
            src,crop,imgIcon
        });


    };
    ;    handelCrop2 = (src2,crop2,imgIcon2) => {

        console.log(crop2);

        this.setState({
            src2,crop2,imgIcon2
        });


    };



    render() {
        const { crop, croppedImageUrl, src,crop2, croppedImageUrl2, src2 } = this.state;

        return (

                // this.state.loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
                <Row className="mb-4" style={{fontSize:16+'px'}}>
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <IntlMessages id="Game-Mode" />
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
                                    onSubmit={this.onSubmit.bind(this)}
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
                                                            <IntlMessages id="Rank" />
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
                                                        <CropComponent label={'icon'} onCropImg={this.handelCrop}/>
                                                    </div>
                                                    <div  className="col-6">
                                                        <CropComponent label={'image'} onCropImg={this.handelCrop2}/>
                                                    </div>
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

export default Categories;