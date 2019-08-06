import React, {Component} from 'react';
import * as Const from "../../Const";
import axios from "axios";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import {Colxx} from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Field, Form, Formik} from "formik";
import CropComponent from "../../CropComponent";
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle
} from "reactstrap";
import * as Yup from "yup";
const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Kill number is required!"),
    Rank: Yup.number()
        .required("MatchType is required!"),

});

class RoweditCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null, crop: null, imgIcon: null,
            src2: null, crop2: null, imgIcon2: null,
            Title:null,Rank:null,isEdit:false
        }
    }
    componentDidMount(){
        console.log(this.props.Title);
        console.log(this.props.Rank);
        this.setState({
            Title:this.props.Title,
            Rank:this.props.Rank,
            CatId:this.props.id
        })

    }
    onSubmit= e => {

        let {crop2,crop}=this.state;
        console.log('crop: '+crop);
        console.log('crop2: '+crop2);


    };
    handelCrop = (src,crop,imgIcon) => {

        console.log(crop);

        this.setState({
            src,crop,imgIcon
        });


    };
    handelCrop2 = (src2,crop2,imgIcon2) => {

        console.log(crop2);

        this.setState({
            src2,crop2,imgIcon2
        });


    };
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
        let {crop2,crop,CatId}=this.state;


        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY={'Title': payload.Title,
            'CategoryId':CatId,
            'RowId': payload.Rank,
            'IconUrl': crop,
            'ImageUrl': crop2
        };
        let form = new FormData();
        form.append('Title', payload.Title);
        form.append('RowId', payload.Rank);
        form.append('IconUrl', crop);
        form.append('ImageUrl', crop2);
        // form.append('SKU', payload.SKU);
        // form.append('Name', payload.Name);
        axios.post(`${Const.Amin_URL}admin/categories/modify` ,BODY, {headers:headers}).then(responsive=>
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
                this.setState({
                    isEdit:true
                })
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
    handelBack(){
        let {isEdit}=this.state;
        this.props.GetBackToMain(isEdit);
    }

    render() {
        let{Title,Rank}=this.state;
        console.log(Title,Rank)

        return (

            // this.state.loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
            <Row className="mb-4" style={{fontSize:18+'px'}} dir='rtl'>
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle className='float-right'>
                                <IntlMessages id="اضافه کردن دسته بندی جدید" />
                            </CardTitle>

                            <Formik
                                initialValues={{

                                    Title:this.props.Title ,
                                    Rank:this.props.Rank,

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
                                                        <IntlMessages id="عنوان" />
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
                                                        <IntlMessages id="رتبه" />
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
                                                    <CropComponent label={'آیکون'} onCropImg={this.handelCrop}/>
                                                </div>
                                                <div  className="col-6">
                                                    <CropComponent label={'عکس'} onCropImg={this.handelCrop2}/>
                                                </div>
                                            </div>
                                        </div>


                                        <div className='d-flex w-100 mt-3'>

                                            <Button color="primary" type="submit" className="col-2 rowInput">
                                                ارسال
                                            </Button>
                                            <Button
                                                className="col-3  btn-warning mr-auto  br05 d-flex justify-content-center align-items-center"
                                                onClick={this.handelBack.bind(this)}>برگشت
                                            </Button>
                                        </div>
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

export default RoweditCategories;