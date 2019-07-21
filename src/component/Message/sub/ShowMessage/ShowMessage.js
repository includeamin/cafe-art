import React, {Component, Fragment} from 'react';
import RowShowMessage from "./RowShowMessage";
import breakfast from '../../../new/cookie-dough-milkshake.jpg';
import {Row} from "reactstrap";




class ShowMessage extends Component {
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
                    {modes?modes.map((todo ,index)=><div className="col-sm-12 col-md-4 col-lg-3 mt-3" key={index}><RowShowMessage key={index} input={todo} index={index} img={breakfast}/></div> ):""}
                </Row>
            </div>

        );
    }
}

export default ShowMessage;