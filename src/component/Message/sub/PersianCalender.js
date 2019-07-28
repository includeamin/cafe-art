import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";
import { Calendar } from "react-persian-calendar-date-picker";

const PersianCalender = (props) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const renderCustomInput = ({ ref, onFocus, onBlur }) => (
        <input
            readOnly
            ref={ref} // necessary
            onFocus={onFocus} // necessary
            onBlur={onBlur} // necessary
            placeholder="تاریخ"
            value={selectedDay ? `${selectedDay.day}/${selectedDay.month}`: ''}
            style={{
                textAlign: 'center',
                padding: '1rem 1.2rem',
                fontSize: '1.2rem',
                border: '1px solid #9c88ff',
                borderRadius: '100px',
                boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
                color: '#9c88ff',
                outline: 'none',
            }}
            className="calenderPersiona" // a styling class
        />
    )

    props.GetData(selectedDay)
    // console.log(selectedDay)
    return (

        <DatePicker

            selectedDay={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="انتخاب روز"
            renderInput={renderCustomInput}
        />
    );
};

export default PersianCalender;
//