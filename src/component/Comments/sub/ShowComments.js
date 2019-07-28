import React, {Component} from 'react';
import {Row} from "reactstrap";
import breakfast from "../../new/cookie-dough-milkshake.jpg";
import RowShowComments from "./RowShowComments";
import * as Const from "../../Const";
import axios from "axios";

class ShowComments extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:'',Description:'',  modes:[0,1,2,3,4,5,6]

        }
    }

    componentWillReceiveProps(props){
        let {ID}=props;
        console.log(ID)
        this.setState({
            id:ID
        });
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        axios.get(`${Const.Amin_URL}admin/item/comments/${ID}` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            // console.log(Description);
            this.setState({
                Description:JSON.parse(Description)
            })

        }).catch(error=>{console.log(error)});
        // console.log(this.state.categories)
    }

    render() {
        let {modes,Description}=this.state;
        let {Name}=this.props;
        return (
        <div className="w-100">
            <Row>
                {Description?Description.map((todo ,index)=><div className="col-sm-12 col-md-4 col-lg-3 mt-3" key={index}><RowShowComments key={index} input={todo} index={todo.Rate} Name={Name} img={breakfast}/></div> ):""}
            </Row>
        </div>
        );
    }
}

export default ShowComments;