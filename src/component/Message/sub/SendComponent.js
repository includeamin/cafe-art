import React, {Component} from 'react';
import SelsectComponent from "./SelsectComponent";
import SendMessange from "./SendComponents/SendMessange";
import SendEvent from "./SendComponents/SendEvent";

class SendComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            changeFeild:false
        }
    }

    changeMode(mode){
        console.log(mode);
        if (mode === 'message') {
            this.setState({changeFeild: false})
        } else {
            this.setState({changeFeild: true})
        }
    }
    render() {
        let{changeFeild}=this.state
        return (
            <div>
                <SelsectComponent changeMode={this.changeMode.bind(this)}/>
                <div>
                    {
                        changeFeild?<SendEvent/>:<SendMessange/>
                    }
                </div>
            </div>
        );
    }
}

export default SendComponent;