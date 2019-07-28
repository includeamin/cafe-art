import React, {Component} from 'react';
import {Row} from "reactstrap";
import RowShowMessage from "../ShowMessage/RowShowMessage";
import breakfast from "../../../new/Cookies-and-Cream-Ice-Cream-Milkshake-3-672px.png";
import * as Const from "../../../Const";
import axios from "axios";
import RowShowEvent from "./RowShowEvent";

class ShowEvents extends Component {
    constructor(props) {
        super(props);
        this.state={
            modes:[0,1,2,3,4,5,6],Description:null


        }
    }

    componentDidMount() {
        // let {ID}=props;
        // console.log(ID)
        // this.setState({
        //     id:ID
        // });
        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };

        axios.get(`${Const.Amin_URL}admin/event`, {headers: headers} ).then(responsive => {
            const {Description} = responsive.data;
            console.log(JSON.parse(Description));
            this.setState({
                Description: JSON.parse(Description)
            })
            //
            //
            }).catch(error => {
            console.log(error)
        });

    }

    // Capacity: 0
    // Date: null
    // Description: "kjhkjhkjhkjhkj"
    // ImageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
    // Price: 0
    // Title: "صبحانه"
    // _id: "5d3d8f3e03b5a4ae9b7e18a0"

    render() {
        let {modes,Description}=this.state;
        return (
            <div className="w-100">
                <Row>
                    {/*{modes?modes.map((todo ,index)=><div className="col-sm-12 col-md-4 col-lg-3 mt-3" key={index}><RowShowMessage key={index} input={todo} index={index} img={breakfast}/></div> ):""}*/}
                    {Description?Description.map((todo ,index)=><div className="col-sm-12 col-md-4 col-lg-3 mt-3" key={index}><RowShowEvent key={index} input={todo} index={index} /></div> ):""}
                </Row>
            </div>
        );
    }
}

export default ShowEvents;