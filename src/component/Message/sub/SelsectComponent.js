import React, {Component} from 'react';
import { Row } from "reactstrap";
import Select from "react-select";
import IntlMessages from "../../../helpers/IntlMessages";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import { Colxx } from "../../../components/common/CustomBootstrap";
const selectData = [
    { label: "event", value: "event" },
    { label: "message", value: "message" },
];

class SelsectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ""
        };
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption }
        );
        this.props.changeMode(selectedOption.value)
    };
    render() {
        return (
            <div>
                <Row>
                    {/*<Colxx xxs="12" md="6" className="mb-5">*/}
                    <div className='col-md-7 offset-md-3 col-sm-12 form-group has-float-label'>


                        <label>
                            <IntlMessages id="select mode" />
                        </label>
                        <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={selectData}
                        />
                    </div>

                    {/*</Colxx>*/}
                </Row>
            </div>
        );
    }
}

export default SelsectComponent;