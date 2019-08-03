import React, {Component} from 'react';
import Items from "../Items";
import AddItem from "../sub/AddItem";
import Gallery from "../../Gallery/Gallery";
import AddGalleryItem from "./AddGalleryItem";

class TwoStepAddItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            step1:true,id:'',itemName:''
        }
    }
    handelGoTwoStep2(item,value){
        this.setState({
            id:item,
            itemName:value,
            step1:false
        });
        console.log("we are in step two")
        console.log(item);
        console.log(value);
    }
    // handelGoTwoStep2(){
    //
    //     this.setState({
    //         step1:false
    //     })
    // }


    render() {
        let{step1,itemName,id}=this.state;
        return (
            <div>
                {
                    step1?<AddItem handelGoTwoStep2={this.handelGoTwoStep2.bind(this)} />:<AddGalleryItem id={id} itemName={itemName}/>

                }
            </div>
        );
    }
}

export default TwoStepAddItem;