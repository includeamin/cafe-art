import React, {Component} from 'react';
import {Colxx} from "../../../../components/common/CustomBootstrap";
import { Row } from "reactstrap";
import GradientWithRadialProgressCard from "../../../../components/cards/GradientWithRadialProgressCard";
import * as Const from "../../../Const";
import axios from "axios";

class DashboardCard extends Component {
    constructor(props) {
        super(props);
        this.state={
            Seen:'',Total:''
        }
    }

    componentDidMount(){
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        axios.get(`${Const.Amin_URL}admin/statistics/comment/seen` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            // console.log(Description);
            // Seen: 6, Total: 10}
            let DES = JSON.parse(Description);
            let {Total, Seen} = DES;
            this.setState({
                Total, Seen
            });
            console.log(DES);

        }).catch(error=>{console.log(error)});
    }

    render() {
        let {Total, Seen} = this.state;

        return (
            <div>
                    <Row>
                        <Colxx  xl="12" className="mb-4">
                            <GradientWithRadialProgressCard
                                icon = "iconsminds-clock"
                                title = {`${Seen} پیام `}
                                detail = {'منتظر برای خواندن'}
                                percent = {`${Seen}`*100/`${Total}`}
                                progressText = {`${Seen}/${Total}`}
                            />
                        </Colxx>
                    </Row>
            </div>
        );
    }
}

export default DashboardCard;