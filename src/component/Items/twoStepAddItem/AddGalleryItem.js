import React, {Component} from 'react';
import CropComponent from "../../CropComponent";
import {Form} from "formik";
import SuggestionComponent from "../SuggestionComponent";
import * as Const from "../../Const";
import axios from "axios";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import MultiFiles from "../MultiFile/MultiFiles";
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup
} from "reactstrap";
import {Colxx} from "../../../components/common/CustomBootstrap";
import ShowGalleryItem from "../../Gallery/ShowGallery/ShowGalleryItem";
class AddGalleryItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            src: null, crop: '', imgIcon: null,
            id:'',itemName:''
        }
    }

    handelCrop = (src,crop,imgIcon) => {

        // console.log(crop);

        this.setState({
            src,crop,imgIcon
        });

    };
    componentWillReceiveProps(props){
        let {id,itemName}=props;
        console.log('id' + id);
        // console.log('value' + value)
        this.setState({
            id,
            itemName
        })
    }
    handelSubmit(e){
        e.preventDefault();
        console.log('submit');


        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let id=this.props.id
        let{crop}=this.state;
        // console.log('id'+id);


        let BODY={
            'ItemId': id,
            'Gallery': [crop],

        };
        console.log(BODY);
        //
        axios.post(`${Const.Amin_URL}admin/item/gallery/image` ,BODY, {headers:headers}).then(responsive=>
        {

            // this.setState({
            //     loaderActive:false
            // });
            const {Description,State}=responsive.data;
            if(State){
                NotificationManager.success(
                    "congratulation",
                    "your categories added",
                    3000,
                    null,
                    null,
                    "success"
                );
                this.setState({
                    id
                });
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
            this.setState({
                loaderActive:false
            });
            console.log(error)});

    }


    render() {
        let{id,itemName}=this.state
        return (


            <div>
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <form>
                                {/*<div className='col-7 offset-3 fontFamimily13vw'>*/}
                                    {/*<SuggestionComponent label='نوع ایتم را انتخاب کنید'*/}
                                                         {/*GetSuggestValue={this.GetSuggestValue.bind(this)}/>*/}
                                {/*</div>*/}
                                <div className="w-100 d-flex mt-3 ">
                                    <div className="col-12">
                                        <CropComponent label={'اضافه کردن  گالری'} onCropImg={this.handelCrop}/>
                                    </div>
                                </div>
                                <Button color="primary" type="submit" className="col-2 rowInput mt-2"
                                        onClick={this.handelSubmit.bind(this)}>
                                    ارسال
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </Colxx>


                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <div>
                                <ShowGalleryItem ID={id} Name={itemName}/>
                            </div>
                        </CardBody>
                    </Card>
                </Colxx>




            </div>




        );
    }
}

export default AddGalleryItem;