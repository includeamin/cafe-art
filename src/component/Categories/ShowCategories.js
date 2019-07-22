import React, {Component} from 'react';
import {Row} from "reactstrap";
// import RowShowMessage from "../Message/sub/ShowMessage/RowShowMessage";
import breakfast from "../new/cookie-dough-milkshake.jpg";
import city from "../new/city.jpg";
import RowShowComments from "../Comments/sub/RowShowComments";
import RowShowCategories from "./sub/RowShowCategories";
class ShowCategories extends Component {
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
                    {modes?modes.map((todo ,index)=><div className="col-sm-12 col-md-4 col-lg-3 mt-3" key={index}><RowShowCategories key={index} input={todo} index={index} img={breakfast}/></div> ):""}
                </Row>
            </div>

        );
    }

}

export default ShowCategories