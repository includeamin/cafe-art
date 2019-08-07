import React, { Component } from 'react';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";


import {base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,getCroppedImg
} from './functions/CropFunction';

import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup
} from "reactstrap";
var Liara = require('@liara/sdk');
var liaraClient = new Liara.Storage.Client({
    accessKey: '36KD7WGGL6GV6Z20BN9WO',
    secretKey: 'qRFjEoHYaprGVv88BW5NArPKhXg4BIq167tNjsdB0',
    endPoint: '5d2d8db2ef99290011583f6d.storage.liara.ir',
});

class CropComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            src: null,
            crop: {
                unit: "%",
                width: 30,
                aspect: 16 / 9
            },imgIcon:null,imgBlob:'',imgCropFile:''
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

        // let file = 'ehsan';

        // base64StringtoFile(croppedImageUrl, file);
        // downloadBase64File(croppedImageUrl, file);
        // let ext = extractImageFileExtensionFromBase64(croppedImageUrl);
        // console.log(file);
        // console.log(file);
        // console.log(fileasbase64);
        //  var file = '/ax.jpg';

        // var fileStream = Fs.createReadStream(file);
        liaraClient.putObject('photos', 'cat.jpg', this.state.croppedImageUrl)
            .then(result => console.log('Successfully uploaded.'))

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
            let{src,imgIcon}=this.state;

            var reader = new FileReader();
            reader.readAsDataURL(this.state.imgBlob);
            // reader.onloadend = function() {
            //     let base64data = reader.result;
            //     this.setState({
            //         imgCropFile:base64data
            //     })
            // }


            reader.onloadend = function() {
                let base64data = reader.result;
                document.getElementById('images').src=base64data;

                // document.getElementById('images').src=base64data
                // console.log(base64data);

                // console.log(myNewCroppedFile)
                // this.setState({
                //     imgCropFile:myNewCroppedFile
                // })
                // console.log(this.state.imgCropFile)
                // let{src,imgIcon}=this.state;
                // this.props.onCropImg(src,myNewCroppedFile,imgIcon)

            };
            let base64data= document.getElementById('images').src
            // console.log(base64data)
            // const myNewCroppedFile = base64StringtoFile(base64data,'arsenal');
            // console.log(myNewCroppedFile) ;
            // console.log(this.state.imgCropFile)

            this.props.onCropImg(src,base64data,imgIcon)
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
                this.setState({
                    imgBlob:blob
                })
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }


    render() {
        const { crop, croppedImageUrl, src ,imgCropFile} = this.state;
        let{label}=this.props;

        return (
            <div>
                    <div  className=' w-100'>
                        <InputGroup className="mb-3  ">
                            <InputGroupAddon addonType="prepend">{label}</InputGroupAddon>
                            <CustomInput
                                type="file"
                                id={label}
                                name={label}
                                onChange={this.onSelectFile.bind(this)}
                                label={this.state.imgIcon}
                                className='fontFamimily11em'
                            />
                        </InputGroup>
                        {/*<input type="file" onChange={this.onSelectFile} />*/}
                    </div>
                <div >
                    {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                            style={{ maxHeight: "100%" }}

                        />
                    )}
                    {croppedImageUrl && (
                        <div>
                            <img  alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                        </div>
                    )}
                </div>
                <img src={imgCropFile} alt={'imags'} id='images' className='d-none' />
                {/*<button className="col-2 btn btn-warning" onClick={this.onSubmit.bind(this)} >submit</button>*/}

            </div>

        );
    }
}

export default CropComponent;