import React, {Component} from 'react';
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";
import { Calendar } from "react-persian-calendar-date-picker";



class PersianClassCalender extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedDay:null
        }
    }
    setSelectedDay(selectedDay){
        this.setState({
            selectedDay
        });
        // console.log(selectedDay);
        this.props.GetData(selectedDay);
    }

    render() {
        const renderCustomInput = ({ ref, onFocus, onBlur }) => (
            <input
                readOnly
                ref={ref} // necessary
                onFocus={onFocus} // necessary
                onBlur={onBlur} // necessary
                placeholder="تاریخ"
                value={this.state.selectedDay ? `${this.state.selectedDay.day}/${this.state.selectedDay.month}`: ''}
                style={{
                    textAlign: 'center',
                    padding: '1rem 1.2rem',
                    fontSize: '1.2rem',
                    border: '1px solid #9c88ff',
                    borderRadius: '100px',
                    boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
                    color: '#9c88ff',
                    outline: 'none',
                    width:'100%'
                }}
                className="calenderPersiona w-100" // a styling class
            />
        )
        let{selectedDay}=this.state;
        return (
            <DatePicker

                selectedDay={selectedDay}
                onChange={date => this.setSelectedDay(date)}
                inputPlaceholder="انتخاب روز"
                renderInput={renderCustomInput}
            />
        );
    }
}

export default PersianClassCalender;