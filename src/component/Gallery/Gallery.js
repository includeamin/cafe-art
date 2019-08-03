import React, {Component} from 'react';
import MultiFiles from "../Items/MultiFile/MultiFiles";
import {Form} from "formik";
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import AutoSuggestEdit from "../Items/AutoSuggestEdit";
import SuggestionComponent from "../Items/SuggestionComponent";
import * as Const from "../Const";
import axios from "axios";
import NotificationManager from "../../components/common/react-notifications/NotificationManager";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state={
            files:[],id:''
        }
    }

    GetSuggestValue(id, value) {
        console.log('id' + id)
        console.log('value' + value)
        this.setState({
            id
        })
    }

    // handelMultiFiles = (files) => {
    //     function getBase64(file) {
    //         var reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = function () {
    //             console.log(reader.result);
    //         };
    //         reader.onerror = function (error) {
    //             console.log('Error: ', error);
    //         };
    //     }
    //
    //
    //     this.setState({
    //         files
    //     });
    //
    //     console.log(files);
    //     let Base64=[];
    //
    //     for (let i = 0; i < files.length; i++)
    //     {
    //        let value= getBase64(files[i]);
    //         Base64.push(value);
    //     }
    //
    //     console.log(Base64)
    // };

    handelMultiFiles(files){
        console.log(files);
        this.setState({
            files
        })

    }

    handelSubmit(e){
        e.preventDefault();


        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let{id,files}=this.state;
        console.log('files');
        console.log(files);
        console.log(typeof files);
        console.log('id');
        console.log(id);
        console.log(typeof id);


        let BODY={
            'ItemId': id,
            'Gallery': files,

        };
        // let form = new FormData();
        // form.append('Title', payload.Title);
        // form.append('RowId', payload.Rank);
        // form.append('IconUrl', crop);
        // form.append('ImageUrl', crop2);
        // form.append('SKU', payload.SKU);
        // form.append('Name', payload.Name);
        axios.post(`${Const.Amin_URL}admin/item/gallery/image` ,BODY, {headers:headers}).then(responsive=>
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



        // URL /admin/item/gallery/image
        // METHOD POST
        // HEADER Id Token
        // BODY ItemId, ImageUrl
        // RESPONSE :
        //     - Success : d
        // ERRORS

    }


    render() {
        return (
            <div>
                <form >
                    <div className='col-7 offset-3 fontFamimily13vw'>
                        <SuggestionComponent label='نوع ایتم را انتخاب کنید' GetSuggestValue={this.GetSuggestValue.bind(this)}/>
                    </div>
                    <MultiFiles MultiFile={this.handelMultiFiles.bind(this)} />
                    <Button color="primary" type="submit" className="col-2 rowInput mt-2" onClick={this.handelSubmit.bind(this)}>
                        ارسال
                    </Button>
                </form>

            </div>
        );
    }
}

export default Gallery;