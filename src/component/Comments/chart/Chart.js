import React, {Component, Fragment} from 'react';
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
import * as Const from "../../Const";
import axios from "axios";
import {barChartData, doughnutChartData} from "../../../data/charts";
const colors = ThemeColors()

// const v=['angry','sad','yay','wow','haha','love','like'];

// componentDidMount(){
//     let {Rate}=this.props.input;
//     switch(Rate) {
//         case 1:
//             this.setState({
//                 emoji:"sad"
//
//                 // emoji:"love"
//             });
//             // code block
//             break;
//         case 2:
//             this.setState({
//                 emoji:"yay"
//             });
//             // code block
//             break;
//         case 3:
//             this.setState({
//                 emoji:"wow"
//
//             });
//             // code block
//             break;
//         case 4:
//             this.setState({
//                 emoji:"haha"
//             });
//             // code block
//             break;
//         case 5:
//             this.setState({
//                 emoji:"love"
//             });
//             // code block
//             break;
//         case 6:
//             this.setState({
//                 emoji:"like"
//             });
//             // code block
//             break;
//         case 0:
//             this.setState({
//                 emoji:"angry"
//
//                 // emoji:"sad"
//             });
//             // code block
//             break;
//         default:
//             this.setState({
//                 emoji:"like"
//             });
//         // code block
//     }
//
//     this.setState({
//         seen:this.props.input.Seen
//     })
// }



//
// import {
//     lineChartData,
//     polarAreaChartData,
//     areaChartData,
//     scatterChartData,
//     barChartData,
//     radarChartData,
//     pieChartData,
//     doughnutChartData
// } from "../../../data/charts";

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:null,Rates:{},percents:[]
        }
    }

    componentWillReceiveProps(props){
    // componentDidMount() {

        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        let id=props.ID;

        axios.get(`${Const.Amin_URL}admin/statistics/item/${id}` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            let categories=JSON.parse(Description);
            console.log(categories);
            let {Rates,Total}=categories;
            let data=[];let i=0;let percents=[];let darsad=[]
            for(i=0;i<7;i++){
                data.push(Rates[i])
                darsad.push(((Rates[i]/Total)*100).toFixed(2))
            }

           let Max=(Math.max(...darsad));
            let Push= 100-Max;
            console.log(typeof Push);
            console.log(typeof Max);
            console.log(typeof darsad[1]);
            console.log(typeof Number(darsad[1]));
            // console.log(Push);
            for(i=0;i<7;i++){
                // data.push(Rates[i])
                console.log(Push);
                let news=Number(darsad[i])+Push;
                console.log(news);
                percents.push(news.toString());
            }
            this.setState({
                data,Rates,percents
            },()=>{console.log(this.state.percents[0])})


        }).catch(error=>{console.log(error)});
    }

    render() {

        console.log(this.props.ID);
        let{data,Rates,percents}=this.state;
        console.log(data);
        console.log(percents);

         const pieChartData = {
            labels: ['angry','sad','yay','wow','haha','love','like'],
            // labels: ['0','1','2','3','4','5','6'],پ
            //  backgroundColor: "rgba(87, 106, 61, 0.1)"
            //  borderColor: "#576a3d"
        // #2a93d5


            datasets: [
                {
                    label: '',
                    borderColor: ["#2a93d5", "#ad8c1b", "#c43d4b","#104978", "#5a5a5a", colors.themeColor6,"#922c88"],
                    backgroundColor: [
                        "rgba(42, 147, 213, 0.1)",
                        "rgba(173, 140, 23, 0.1)",
                        "rgba(196, 61, 75, 0.1)",
                        "rgba(16, 73, 120, 0.1)",
                        "rgba(90, 90, 90, 0.1)",
                        colors.themeColor6_10,
                        "rgba(146, 34, 146, 0.1)",
                    ],
                    borderWidth: 2,
                    data: this.state.data
                }
            ]
        };


        const barChartData = {
            labels: [''],
            datasets: [
                {
                    label: '0',
                    borderColor: colors.themeColor1,
                    backgroundColor: colors.themeColor1_10,
                    // data:[this.state.Rates[0]],
                    data:this.state.percents[0],
                    borderWidth: 2
                },
                {
                    label: '1',
                    borderColor: colors.themeColor2,
                    backgroundColor: colors.themeColor2_10,
                    data:this.state.percents[1],
                    borderWidth: 2
                },
                {
                    label: '2',
                    borderColor: colors.themeColor3,
                    backgroundColor: colors.themeColor3_10,
                    data:this.state.percents[2],
                    borderWidth: 2
                },
                {
                    label: '3',
                    borderColor: colors.themeColor4,
                    backgroundColor: colors.themeColor4_10,
                    data:this.state.percents[3],
                    borderWidth: 2
                },
                {
                    label: '4',
                    borderColor: colors.themeColor5,
                    backgroundColor: colors.themeColor5_10,
                    data:this.state.percents[4],
                    borderWidth: 2
                },
                {
                    label: '5',
                    borderColor: colors.themeColor6,
                    backgroundColor: colors.themeColor6_10,
                    data:this.state.percents[5],
                    borderWidth: 2
                }
                ,
                {
                    label: '6',
                    borderColor: colors.themeColor2,
                    backgroundColor: colors.themeColor2_10,
                    data:this.state.percents[6],
                    borderWidth: 2
                }
            ]
        };

        // console.log(Rates[0])
        return (
            <div>

                {data?
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
                                                {/*{Rates? <BarChart shadow data={barChartData} /> :''}*/}
                                                <DoughnutChart shadow data={pieChartData} />
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

export default Chart;