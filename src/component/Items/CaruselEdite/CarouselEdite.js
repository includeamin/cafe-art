import React, {Component, Fragment} from 'react';
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../helpers/IntlMessages";
import ReactSiemaCarousel from "../../../components/ReactSiema/ReactSiemaCarousel";
import data from "../../../data/carouselItems";

const BasicCarouselItem = ({ title, img, detail }) => {
    return (
        <div className="pr-3 pl-3">
            <Card className="flex-row">
                <div className="w-100 position-relative">
                    <img className="card-img-left br05" src={img} alt={title} />
                </div>
            </Card>
        </div>
    );
};

class CarouselEdite extends Component {
    render() {
        return (
            <Row className='mt-2'>
                <Colxx xxs="12" className="pl-0 pr-0 mb-5">
                    <ReactSiemaCarousel
                        perPage={{
                            0: 1,
                            1000: 2,
                            1400: 3
                        }}
                        loop={false}
                    >
                        {data.map(item => {
                            return (
                                <div key={item.id}>
                                    <BasicCarouselItem {...item} />
                                </div>
                            );
                        })}
                    </ReactSiemaCarousel>
                </Colxx>
            </Row>
        );
    }
}

export default CarouselEdite;