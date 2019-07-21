import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactCrop from 'react-image-crop';
import img2 from './../../new/coffee.jpg'


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
const imageMaxSize = 1000000000 ;// bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});

const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Title is required!"),
    Rank: Yup.number()
        .required("Rank is required!"),
    Description: Yup.mixed()
        .nullable("Description string is required!"),

});

class SendMessange extends Component {
    constructor(props) {
        super(props);

        this.state={
            src: null,
            crop: {
                unit: "%",
                width: 30,
                aspect: 16 / 9
            },imgIcon:null,
            src2: null,
            crop2: {
                unit: "%",
                width: 30,
                aspect: 16 / 9
            },imgIcon2:null
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

        // e.preventDefault();
        let {croppedImageUrl} = this.state;
        // console.log(this.state.src);
        console.log(croppedImageUrl);
        // console.log(croppedImageUrl2);
        let file = 'ehsan';
        // base64StringtoFile(croppedImageUrl, file);
        // downloadBase64File(croppedImageUrl, file);
        let ext = extractImageFileExtensionFromBase64(croppedImageUrl);
        // let ext2 = extractImageFileExtensionFromBase64(croppedImageUrl2);
        console.log(ext);
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

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }

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
                                    Rank:"",
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
                                                <div>
                                                    <InputGroup className="mb-3">
                                                        <InputGroupAddon addonType="prepend">Image:</InputGroupAddon>
                                                        <CustomInput
                                                            type="file"
                                                            id="setIcon"
                                                            name="setIcon"
                                                            onChange={this.onSelectFile.bind(this)}
                                                            label={this.state.imgIcon}
                                                        />
                                                    </InputGroup>
                                                </div>

                                            </div>
                                        </div>
                                        <div>
                                            <div className="float-left col-5  ">
                                                {src && (
                                                    <div className="">
                                                        <ReactCrop
                                                            src={src}
                                                            crop={crop}
                                                            onImageLoaded={this.onImageLoaded}
                                                            onComplete={this.onCropComplete}
                                                            onChange={this.onCropChange}
                                                        />
                                                    </div>

                                                )}
                                                {croppedImageUrl && (
                                                    <div>
                                                        <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                                                    </div>
                                                )}
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