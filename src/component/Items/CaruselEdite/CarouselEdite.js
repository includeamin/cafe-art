import React, {Component, Fragment} from 'react';
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../helpers/IntlMessages";
import ReactSiemaCarousel from "../../../components/ReactSiema/ReactSiemaCarousel";
import data from "../../../data/carouselItems";
import LiItemGallery from "./LiItemGallery";

const BasicCarouselItem = (item) => {
    // console.log(item);
    return (
        <div className="pr-3 pl-3">
            <Card className="flex-row">
                <div className="w-100 position-relative">
                    <img className="card-img-left br05" src={item} alt={item} />
                </div>
            </Card>
        </div>
    );
};

class CarouselEdite extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:null
        }
    }

    componentDidMount(){
        // this.setState({
        //     data:this.props.data
        // })
    }
    render() {
        // console.log(this.props.data);
        // let{data}=this.state;

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
                        {
                            this.props.data?
                                this.props.data.map((item,index) => {
                            return (
                                <div key={index}>
                                    <LiItemGallery item={item} />
                                </div>
                            );
                        }):''}
                    </ReactSiemaCarousel>
                </Colxx>
            </Row>
        );
    }
}

export default CarouselEdite;