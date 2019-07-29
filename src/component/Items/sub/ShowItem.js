import React, {Component} from 'react';
import {Row} from "reactstrap";
// import RowShowMessage from "../Message/sub/ShowMessage/RowShowMessage";
import milkshake from "../../new/Cookies-and-Cream-Ice-Cream-Milkshake-3-672px.png";
import breakfast from "../../new/cookie-dough-milkshake.jpg";
import RowShowItem from "./RowShowItem/RowShowItem";
import * as Const from "../../Const";
import axios from "axios";


class ShowItem extends Component {


    constructor(props) {
        super(props);
        this.state={
            modes:[0,1,2,3,4,5,6],categories:null


        }
    }
    componentDidMount(){
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        axios.get(`${Const.Amin_URL}admin/items` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            // console.log(Description);
            let categories=JSON.parse(Description);


            this.setState({
                categories
            })


        }).catch(error=>{console.log(error)});
        // console.log(this.state.categories)
    }


    render() {
        let {modes,categories}=this.state;
        console.log(categories);
        return (
            <div className="w-100">
                <Row>
                    {categories?categories.map((todo ,index)=><div className="col-sm-12 col-md-4  mt-3" key={index}><RowShowItem key={index} input={todo} index={index} img={milkshake}/></div> ):""}
                </Row>
            </div>

        );
    }
}

export default ShowItem;