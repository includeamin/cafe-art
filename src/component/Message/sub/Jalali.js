import moment from "moment";
import jMoment from "moment-jalaali";
import 'moment/locale/ar-sa';
import React, { useState } from "react";
import JalaliUtils from "@date-io/jalaali";
import {
    TimePicker,
    DateTimePicker,
    DatePicker,KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function Jalali(props) {
    const [selectedDate, handleDateChange] = useState(moment());
  props.GetData(selectedDate)
    // const [selectedDate ] = useState(moment());


    return (
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
                classNAme='w-100'

                // format="MM/dd/yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={date => handleDateChange(date)}
            />

        </MuiPickersUtilsProvider>
    );
}

export default Jalali;