import React, {Component} from 'react';
import IntlMessages from "../../helpers/IntlMessages";

class ShowDescriptionItems extends Component {
    render() {
        let{label,value}=this.props;

        return (
            <div className="w-100 float-right  ">
                <p className="  m-2 fontSize17em warning-color-text  d-flex  justify-content-start">
                    <IntlMessages id={`${label} :`}/>
                </p>
                <p className=" m-2 fontSize17em font-weight-bold text-justify " dir='rtl'>
                    {/*<div className='text-justify'></div>*/}
                    {value}
                </p>
            </div>
        );
    }
}

export default ShowDescriptionItems;