import React, {Component} from 'react';

import { Card, CardBody, CardTitle } from "reactstrap";

import IntlMessages from "../../../../helpers/IntlMessages";

import ReactSiemaCarousel from "../../../../components/ReactSiema/ReactSiemaCarousel";
import Rating from "../../../../components/common/Rating";
import data from "../../../../data/topRatedItems";
import * as Const from "../../../Const";
import axios from "axios";



const TopRatedItem = ({ Image, order, Title, AverageRate, Total ,index}) => (
    <div className="pr-2 pl-2">
        <img src={Image} alt={Title} className="mb-4" />
        <h6 className="mb-1">
            <span className="mr-2">{index+1}.</span>
            {Title}
        </h6>
        <Rating total={6} rating={AverageRate} interactive={false} />
        <p className="text-small text-muted mb-0 d-inline-block">({Total})</p>
    </div>
);


const DashboardTopItem = (props) => {

    const sliderPerPage = {
        0: 1,
        480: 2,
        992: 1
    };
    console.log(props.data);

    return (
        <Card className="dashboard-top-rated">
            <CardBody>
                <CardTitle>
                    <IntlMessages id="برترین اقلام" />
                </CardTitle>
                <ReactSiemaCarousel
                    perPage={sliderPerPage}
                    controls={false}
                    loop={false}
                >
                    {props.data &&
                    props.data.map((item, index) => (
                        <div key={index}>
                            <TopRatedItem {...item} index={index}/>
                        </div>
                    ))}
                </ReactSiemaCarousel>
            </CardBody>
        </Card>
    );
};

export default DashboardTopItem;
