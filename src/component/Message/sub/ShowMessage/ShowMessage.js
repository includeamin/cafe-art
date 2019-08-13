import React, {Component, Fragment} from 'react';
import RowShowMessage from "./RowShowMessage";
import breakfast from '../../../new/cookie-dough-milkshake.jpg';
import {Row} from "reactstrap";
import * as Const from "../../../Const";
import axios from "axios";




class ShowMessage extends Component {


    constructor(props) {
        super(props);
        this.state={
            id:'',Description:'',  modes:[0,1,2,3,4,5,6]
        }
    }
    componentDidMount(){

        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        axios.get(`${Const.Amin_URL}admin/notifications` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            console.log(Description);
            this.setState({
                Description:JSON.parse(Description)
            })

        }).catch(error=>{console.log(error)});
        // console.log(this.state.categories)
    }

    render() {
        let {modes,Description}=this.state;
        console.log(Description);
        return (
            <div className="w-100">
                <Row>
                    {Description?Description.map((todo ,index)=><div className="col-sm-12 col-md-4 col-lg-3 mt-3" key={index}><RowShowMessage key={index} {...todo}  index={index}/></div> ):""}
                </Row>
            </div>

        );
    }
}

export default ShowMessage;