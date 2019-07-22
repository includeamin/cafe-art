import React, {Component} from 'react';
import {Row} from "reactstrap";
// import RowShowMessage from "../Message/sub/ShowMessage/RowShowMessage";
import milkshake from "../../new/Cookies-and-Cream-Ice-Cream-Milkshake-3-672px.png";
import breakfast from "../../new/cookie-dough-milkshake.jpg";
import RowShowItem from "./RowShowItem/RowShowItem";


class ShowItem extends Component {


    constructor(props) {
        super(props);
        this.state={
            modes:[0,1,2,3,4,5,6]


        }
    }

    render() {
        let {modes}=this.state;
        return (
            <div className="w-100">
                <Row>
                    {modes?modes.map((todo ,index)=><div className="col-sm-12 col-md-4  mt-3" key={index}><RowShowItem key={index} input={todo} index={index} img={milkshake}/></div> ):""}
                </Row>
            </div>

        );
    }
}

export default ShowItem;