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
import AutoSuggestEdit from "../AutoSuggestEdit";
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

class AddItem extends Component {
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

    // handleOnCropChange = (crop) => {
    //     this.setState({crop:crop})
    // };
    // handleOnCropComplete = (crop, pixelCrop) =>{
    //     // console.log(crop, pixelCrop)
    //     const canvasRef = this.imagePreviewCanvasRef.current
    //     const {imgSrc}  = this.state
    //     image64toCanvasRef(canvasRef, imgSrc, crop)
    // };
    // verifyFile = (files) => {
    //     if (files && files.length > 0){
    //         const currentFile = files[0]
    //         const currentFileType = currentFile.type
    //         const currentFileSize = currentFile.size
    //         if(currentFileSize > imageMaxSize) {
    //             alert("This file is not allowed. " + currentFileSize + " bytes is too large")
    //             return false
    //         }
    //         if (!acceptedFileTypesArray.includes(currentFileType)){
    //             alert("This file is not allowed. Only images are allowed.")
    //             return false
    //         }
    //         return true
    //     }
    // };
    // handleClearToDefault = event =>{
    //     if (event) event.preventDefault()
    //     const canvas = this.imagePreviewCanvasRef.current
    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     this.setState({
    //         imgSrc: null,
    //         imgSrcExt: null,
    //         crop: {
    //             aspect: 1/1
    //         }
    //
    //     })
    //     this.fileInputRef.current.value = null
    // }
    // handleFileSelect = event => {
    //     // console.log(event)
    //     const files = event.target.files;
    //     if (files && files.length > 0){
    //         const isVerified = this.verifyFile(files);
    //         if (isVerified){
    //             // imageBase64Data
    //             const currentFile = files[0];
    //             const myFileItemReader = new FileReader();
    //             myFileItemReader.addEventListener("load", ()=>{
    //                 // console.log(myFileItemReader.result)
    //                 const myResult = myFileItemReader.result;
    //                 this.setState({
    //                     imgSrc: myResult,
    //                     imgSrcExt: extractImageFileExtensionFromBase64(myResult),
    //                     imgIcon:currentFile.name
    //                 })
    //             }, false);
    //             console.log(this.state.imgSrcExt);
    //             console.log(this.state.imgSrcExt);
    //
    //             myFileItemReader.readAsDataURL(currentFile)
    //
    //         }
    //     }
    // };

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







    onSelectFile2(e){
        let file=e.target.files;
        if (file && file.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src2: reader.result,imgIcon2:file[0].name })
            );

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded2 = image2 => {
        this.imageRef2 = image2;
    };

    onCropComplete2 = crop2 => {
        this.makeClientCrop2(crop2);
    };

    onCropChange2 = (crop2, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop2 });
    };

    async makeClientCrop2(crop2) {
        if (this.imageRef2 && crop2.width && crop2.height) {
            const croppedImageUrl2 = await this.getCroppedImg(
                this.imageRef2,
                crop2,
                "newFile2.jpeg"
            );
            this.setState({ croppedImageUrl2 });
        }
    }





    onSubmit= e => {
        // e.preventDefault();
        let {croppedImageUrl,croppedImageUrl2} = this.state;
        // console.log(this.state.src);
        console.log(croppedImageUrl);
        console.log(croppedImageUrl2);
        let file = 'ehsan';
        // base64StringtoFile(croppedImageUrl, file);
        // downloadBase64File(croppedImageUrl, file);
        let ext = extractImageFileExtensionFromBase64(croppedImageUrl);
        let ext2 = extractImageFileExtensionFromBase64(croppedImageUrl2);
        console.log(ext);
        console.log(ext2);
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
        const { crop, croppedImageUrl, src,crop2, croppedImageUrl2, src2 } = this.state;
        const option=[{'name':'breakfast'},{'name':'dinner'},{'name':'lunch'},{'name':'hot drink'},{'name':'cold Drink'}];

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
                                                        <IntlMessages id="Categories" />
                                                    </Label>
                                                    <AutoSuggestEdit
                                                        placeholder = {"type item name"}
                                                        data={option}
                                                        // onChange={value => this.handelChange(this, value)}
                                                        onChange={value => {this.setState({value})}}
                                                    />
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="w-100 d-flex ">

                                            <div className="col-6">
                                                <div>
                                                    <InputGroup className="mb-3">
                                                        <InputGroupAddon addonType="prepend">Icon</InputGroupAddon>
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
                                            <div className="col-6">
                                                <div>
                                                    <InputGroup className="mb-3">
                                                        <InputGroupAddon addonType="prepend">Image</InputGroupAddon>
                                                        <CustomInput
                                                            type="file"
                                                            id="setIcon"
                                                            name="setIcon"
                                                            onChange={this.onSelectFile2.bind(this)}
                                                            label={this.state.imgIcon2}
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
                                            <div className="float-right col-5 ">
                                                {src2 && (

                                                    <ReactCrop
                                                        src={src2}
                                                        crop={crop2}
                                                        onImageLoaded={this.onImageLoaded2}
                                                        onComplete={this.onCropComplete2}
                                                        onChange={this.onCropChange2}
                                                    />

                                                )}
                                                {croppedImageUrl2&& (
                                                    <div>
                                                        <img alt="Crop2" style={{ maxWidth: "100%" }} src={croppedImageUrl2} />
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

export default AddItem;