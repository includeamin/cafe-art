import React, {Component} from 'react';
import IntlMessages from "../helpers/IntlMessages";

class RowShowShow extends Component {
    render() {
        let{label,value}=this.props;

        return (
            <div className="w-100 d-flex justify-content-between ">
                <p className="  m-2 fontSize17em warning-color-text">
                    <IntlMessages id={`${label} :`}/>
                </p>
                <p className=" m-2 fontSize17em font-weight-bold">
                    {value}
                </p>
            </div>
        );
    }
}

export default RowShowShow;