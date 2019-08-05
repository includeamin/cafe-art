import React, {Component} from 'react';
import * as Const from "../../Const";
import axios from "axios";
import ShowComments from "../sub/ShowComments";
import {Colxx} from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { ThemeColors } from './../../../helpers/ThemeColors'
// import {pieChartData} from "../../../data/charts";
import { Row, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import {
    DoughnutChart,
    LineChart,
    PolarAreaChart,
    AreaChart,
    ScatterChart,
    BarChart,
    RadarChart,
    PieChart
} from "../../../components/charts";
import {barChartData} from "../../../data/charts";
const colors = ThemeColors()

class CategoriesChartCulome extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:null,Rates:{},percents:[],barChartData:null
        }
    }

    componentWillReceiveProps(props){
        // componentDidMount() {

        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        let id=props.ID;
        // console.log(id)


        axios.get(`${Const.Amin_URL}admin/statistics/category/${id}` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            let categories=JSON.parse(Description);
            console.log(categories);
            let i=0;
            var keys = Object.keys(categories);
            let length=keys.length;

            let datasets=[]; let labels=[];
            for (i;i<length;i++) {
                let item= {
                    label: keys[i],
                    borderColor: colors.themeColor1,
                    backgroundColor: colors.themeColor1_10,
                    // data:[this.state.Rates[0]],
                    data:[categories[keys[i]]],
                    borderWidth: 2
                };
                let l=keys[i];
                datasets.push(item);
                // labels.push(l);
            }

            let barChartData={
                labels:labels,datasets:datasets
            };
            console.log(barChartData);
            this.setState({
                barChartData
            })
            //
            // console.log(keys);
            // console.log(length);
            // console.log(categories[keys[0]])





        }).catch(error=>{console.log(error)});
    }

    render() {

        console.log(this.props.ID);
        let{data,Rates,percents,barChartData}=this.state;
        console.log(barChartData)
       // const barChartData = {
       //      labels: ['January', 'February'],
       //      datasets: [
       //          {
       //              label: 'Cakes',
       //              borderColor: colors.themeColor1,
       //              backgroundColor: colors.themeColor1_10,
       //              data: [2],
       //              borderWidth: 2
       //          },
       //          {
       //              label: 'Desserts',
       //              borderColor: colors.themeColor2,
       //              backgroundColor: colors.themeColor2_10,
       //              data: [5],
       //              borderWidth: 2
       //          }
       //      ]
       //  }
        return (
            <div>

                {barChartData?
                    <Row className="mb-4">
                        <Colxx xxs="12">
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        <IntlMessages id="charts.pie" />
                                    </CardTitle>
                                    <Row>
                                        <Colxx xxs="12" lg="6" className="mb-5">
                                            <CardSubtitle>
                                                <IntlMessages id="charts.shadow" />
                                            </CardSubtitle>
                                            <div className="chart-container">
                                                <BarChart shadow data={barChartData} />

                                                {/*<PieChart shadow data={pieChartData} />*/}
                                            </div>
                                        </Colxx>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Colxx>
                    </Row>



                    :""}

            </div>
        );
    }
}

export default CategoriesChartCulome;