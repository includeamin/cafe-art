import React, {Component, Fragment} from 'react';
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import data from "../../../../../data/cakes";
import * as Const from "../../../../Const";
import axios from "axios";
import CommentsRow from "../../../../Comments/sub/NewComments/sub/CommentsRow";
import LiShowCategoriesAndItems from "./LiShowCategoriesAndItems";


class ShowCategoriesAndItems extends Component {
    constructor(props) {
        super(props);
        this.state={
            categories:[]
        }
    }

    componentDidMount(){
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        axios.get(`${Const.Amin_URL}items/categorized` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            console.log(Description);
            let keys=Object.keys(Description);
            let i;let categories=[];let subcategories=[];
            console.log(keys);
            for (i in keys){
                subcategories.push(Description[keys[i]]);
                categories.push({'title':keys[i],'sub':Description[keys[i]]});

            }
            this.setState({
                categories
            });
            // console.log(categories);
            // console.log(subcategories)
            console.log(categories)


            // let categories=JSON.parse(Description);
            // console.log(categories);

        }).catch(error=>{console.log(error)});
    }
    render() {
        let {categories}=this.state;
        return (
            <Card className="dashboard-link-list " >
                <CardBody>
                    <CardTitle>
                        <div className='float-right'>
                            <IntlMessages id="دسته بندی و آیتم های موجود " />

                        </div>
                    </CardTitle>
                    <div className="d-flex flex-row">
                        <div className="w-100">
                            {categories?categories.map((todo ,index)=><LiShowCategoriesAndItems  key={index} categories={todo}/>):""}
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default ShowCategoriesAndItems;