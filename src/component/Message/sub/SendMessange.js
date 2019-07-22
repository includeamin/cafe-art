import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactCrop from 'react-image-crop';
import img2 from './../../new/coffee.jpg'
import {FormikReactSelect} from "../../../containers/form-validations/FormikFields";



import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup,
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
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import CropComponent from "../../CropComponent";
const imageMaxSize = 1000000000 ;// bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});
const options = [
    { value: "notification", label: "notification" },
    { value: "event", label: "event" }
];


const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Title is required!"),
    // TypeKind: Yup.number()
    //     .required("TypeKind is required!"),
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


    onSelectFile(e){
        let file=e.target.files;
        if (file && file.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result,imgIcon:file[0].name })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
        }
    }

    onSubmit= (values,e) => {
        const payload = {
            ...values,
        };
        console.log(values);
        let {src,crop,imgIcon} = this.state;

        // e.preventDefault();
        // let {croppedImageUrl} = this.state;
        // console.log(this.state.src);
        // console.log(croppedImageUrl);
        // console.log(croppedImageUrl2);
        // let file = 'ehsan';
        // base64StringtoFile(croppedImageUrl, file);
        // downloadBase64File(croppedImageUrl, file);
        // let ext = extractImageFileExtensionFromBase64(croppedImageUrl);
        // let ext2 = extractImageFileExtensionFromBase64(croppedImageUrl2);
        // console.log(ext);
        // console.log(ext2);
        // console.log(ext);
        // console.log(fileasbase64);


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
                                    TypeKind: { value: "notification", label: "notification" },
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

                                            <div className="col-sm-12 mb-1">
                                                <FormGroup className="form-group has-float-label ">
                                                    <Label>
                                                        <IntlMessages id="TypeKind" />
                                                    </Label>
                                                    <FormikReactSelect
                                                        name="TypeKind"
                                                        id="TypeKind"
                                                        value={values.TypeKind}
                                                        options={options}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                    />
                                                    {errors.TypeKind && touched.TypeKind ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.TypeKind}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </div>


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