import React, {Component, useState} from 'react';
import moment from "moment";
import jMoment from "moment-jalaali";
import 'moment/locale/ar-sa';
import JalaliUtils from "@date-io/jalaali";
import {
    TimePicker,
    DateTimePicker,
    DatePicker,KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
// const [selectedDate, handleDateChange] = useState(moment());


class JalaliComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedDate:moment(),
        }

    }
    // componentDidMount(){
    //     let
    // }
    handleDateChange(data){
        this.setState({
            selectedDate:data
        });
        console.log(data)
    }

    render() {

        let{selectedDate}=this.state;
        console.log(this.state.selectedDate)
        return (
            <div>
                <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                    {/*<DatePicker*/}
                    {/*clearable*/}
                    {/*okLabel="تأیید"*/}
                    {/*cancelLabel="لغو"*/}
                    {/*clearLabel="پاک کردن"*/}
                    {/*labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}*/}
                    {/*value={selectedDate}*/}
                    {/*onChange={handleDateChange}*/}
                    {/*/>*/}

                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Data"
                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                        className='w-100 '

                        value={selectedDate}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={date => this.handleDateChange(date)}

                        // onChange={date => this.handleDateChange.bind(date)}
                    />

                </MuiPickersUtilsProvider>

            </div>
        );
    }
}

export default JalaliComponent;