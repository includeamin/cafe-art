import React, {Component} from 'react';
import SuggestCategoriesComponent from "../SuggestCategoriesComponent";
import SuggestionComponent from "../Items/SuggestionComponent";
import ShowComments from "./sub/ShowComments";
import Chart from "./chart/Chart";
import CategoriesChartCulome from "./chart/CategoriesChartCulome";

class CategoriesChart extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:'',itemName:''
        }
    }

    GetSuggestValue(id, value) {
        console.log('id' + id)
        // console.log('value' + value)
        this.setState({
            id:id,
            itemName:value
        })
    }
    render() {
        let {id,itemName}=this.state;

        return (
            <div>
                <SuggestCategoriesComponent label='itemList' GetSuggestValue={this.GetSuggestValue.bind(this)}/>

                <div>
                    <CategoriesChartCulome ID={id} Name={itemName}/>

                    {/*<Chart ID={id} Name={itemName}/>*/}

                </div>
            </div>
        );
    }
}

export default CategoriesChart;