import React, {Component} from 'react';
import {Row} from "reactstrap";
// import RowShowMessage from "../Message/sub/ShowMessage/RowShowMessage";
import breakfast from "../new/cookie-dough-milkshake.jpg";
import city from "../new/city.jpg";
import RowShowComments from "../Comments/sub/RowShowComments";
import RowShowCategories from "./sub/RowShowCategories";
import * as Const from "../Const";
import axios from "axios";

class ShowCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            modes:[0,1,2,3,4,5,6]


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
            console.log(Description);
            let DES=JSON.parse(Description);
            console.log(DES)
            this.setState({
                modes:DES
            });
            // console.log(this.state.modes);

        }).catch(error=>{console.log(error)});
    }

    render() {
        let {modes}=this.state;
        return (
            <div className="w-100">
                <Row>
                    {modes?modes.map((todo ,index)=><div className="col-sm-12 col-md-4 col-lg-3 mt-3" key={index}><RowShowCategories key={index} input={todo} index={index} img={breakfast}/></div> ):""}
                </Row>
            </div>

        );
    }

}

export default ShowCategories