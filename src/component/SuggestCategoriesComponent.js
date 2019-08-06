import React, {Component} from 'react';
import {
    FormGroup,
    Label,
} from "reactstrap";
import IntlMessages from "../helpers/IntlMessages";
import * as Const from "./Const";
import axios from "axios";
import AutoSuggestEdit from "./Items/AutoSuggestEdit";


class SuggestCategoriesComponent extends Component {
    constructor(props) {
        super(props);

        this.state={
            categories:[],option:[],files:[],categoriesList:{},suggest:[],
        }
    }
    componentDidMount(){
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        axios.get(`${Const.Amin_URL}categories` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            // console.log(Description);
            let categories=JSON.parse(Description);
            let index;

            let  option=[];
            categories.map(item => {
                option.push({name: item.Title})
            });
            // console.log(option)

            let categoriesList = {};

            for (index in categories){
                let id =categories[index].Title;
                let Value =categories[index].RowId;
                // dict[id] = Value;
                categoriesList[Value] = id;
            }

            this.setState({
                categoriesList,categories,option
            })
            console.log(categoriesList);

        }).catch(error=>{console.log(error)});
        console.log(this.state.categories)

    }

    handelSuggestValue=(value)=>{
        this.setState({suggest:value});

        let{categoriesList,suggest}=this.state;
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }
        let itm=getKeyByValue(categoriesList,value);
        // console.log(itm,value)
        this.props.GetSuggestValue(itm,value)
    };



    render() {
        let {option}=this.state;
        let {label}=this.props;
        return (
            <div className="w-100 rowInput">
                <FormGroup className="form-group has-float-label position-relative ">
                    <Label>
                        <IntlMessages id={label} />
                    </Label>
                    <AutoSuggestEdit
                        placeholder = {"type item name"}
                        data={option}
                        onChange={value => {this.handelSuggestValue(value)}}
                        // onChange={value => {this.setState({value})}}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default SuggestCategoriesComponent;