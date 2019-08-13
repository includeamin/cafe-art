import React, {Component} from 'react';
import AdminProfile from "./dashboardComponents/AdminProfile";
import {Colxx} from "../../../components/common/CustomBootstrap";
import DashboardCard from "./dashboardComponents/DashboardCard";
import DashboardTopItem from "./dashboardComponents/DashboardTopItem";
import * as Const from "../../Const";
import axios from "axios";
import ShowCategoriesAndItems from "./dashboardComponents/ShowCategoriesAndItem/ShowCategoriesAndItems";

class Showdashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:null
        }
    }

    componentDidMount(){
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        axios.get(`${Const.Amin_URL}admin/statistics/item/top` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            // console.log(Description);
            let DES=JSON.parse(Description);
            this.setState({
                data:DES
            });
            console.log(DES);

        }).catch(error=>{console.log(error)});
    }

    render() {
        return (
            <div className='d-flex'>

                <Colxx lg="6" md="6" xl="4" sm="12" className="mb-4">
                    <AdminProfile/>
                </Colxx>
                <div className='col-4'>
                    {/*<Colxx lg="12" md="12" xl="4" sm="12" className="mb-4">*/}
                        <DashboardCard/>
                    {/*</Colxx>*/}
                    {
                        this.state.data?
                            <DashboardTopItem data={this.state.data}/>
                        // </Colxx>
                            :""
                    }
                </div>
                    <Colxx lg="6" md="6" xl="4" sm="12" className="mb-4">
                    <ShowCategoriesAndItems/>
                    </Colxx>






            </div>
        );
    }
}

export default Showdashboard;