import React, {Component} from 'react';
import { Row, Card  } from "reactstrap";

class LiItemGallery extends Component {
    render() {
        let{item}=this.props;
        // console.log(item)
        return (
            <div className="pr-3 pl-3 ">
                <Card className="flex-row">
                    <div className="w-100 position-relative imagheight40vh">
                        <img className="card-img-left br05" src={item.ImageUrl} alt={item} />
                    </div>
                </Card>
            </div>
        );
    }
}

export default LiItemGallery;