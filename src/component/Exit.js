import React, {Component} from 'react';
import * as Const from "./Const";
import axios from "axios";
import NotificationManager from "../components/common/react-notifications/NotificationManager";
import { withRouter } from "react-router-dom";

class Exit extends Component {
componentDidMount(){
    // let headers = {
    //     'Token':`a41b94444d46e47c8e796c114dd342ab60327db10596c15727e0ee4c61fc5428`,
    //     'ID': `5d4aa615bedfee80aaadc94c`
    // };
    let headers = {
        'ID':`${Const.Token}`,
        'Token': `${Const.ID}`
    };
    console.log(headers);
    async function deleteItems(){
        await localStorage.removeItem('user_id');
        await localStorage.removeItem('user_Token');
        return true
    }
    axios.post(`${Const.Amin_URL}admin/logout` , null,{headers:headers}).then(responsive=>
    {
        // this.setState({
        //     loaderActive:false
        // });
        const {Description,State}=responsive.data;
        if(Description === "d"){

            let data=deleteItems();
            console.log(data)
            if (data){
                this.props.history.push("/user/login");
            }
            NotificationManager.success(
                "congratulation",
                "your exit",
                3000,
                null,
                null,
                "success"
            );
        }else {
            NotificationManager.error(
                " new game currency didnt add",
                Description,
                3000,
                null,
                null,
                "success"
            );
        }

        // let DES=JSON.parse(Description);
        // this.props.inprogress(DES);x
        console.log(Description)
    }).catch(error=>{
        // this.setState({
        //     loaderActive:false
        // });
        console.log(error)});

}
    render() {
        return (
            <div>
                <h2>exit</h2>

            </div>
        );
    }
}

export default withRouter(Exit);