import React, { Component } from 'react';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,getCroppedImg
} from './../functions/CropFunction';
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup
} from "reactstrap";
class ShowCategories extends Component {

    constructor(props) {
        super(props);
        this.state={
            src: null,
            crop: {
                unit: "%",
                width: 30,
                aspect: 16 / 9
            },imgIcon:null
        }
    }

    onSelectFile = e => {
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
    onSubmit=e=>{
        e.preventDefault();
        let {croppedImageUrl} = this.state;
        console.log(this.state.src);
        console.log(this.state.croppedImageUrl);
        let file = 'ehsan';
        // base64StringtoFile(croppedImageUrl, file);
        downloadBase64File(croppedImageUrl, file);
        let ext = extractImageFileExtensionFromBase64(croppedImageUrl);
        console.log(file);
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
            <div>
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
                        {/*<input type="file" onChange={this.onSelectFile} />*/}
                    </div>
                    {src && (

                        <ReactCrop
                            src={src}
                            crop={crop}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />

                    )}
                    {croppedImageUrl && (
                        <div>
                            <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                        </div>
                    )}
                    <button className="col-2 btn btn-warning" onClick={this.onSubmit.bind(this)} >submit</button>
                </div>
            </div>

        );
    }

}
export default ShowCategories