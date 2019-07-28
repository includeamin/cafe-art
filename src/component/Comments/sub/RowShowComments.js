import React, {Component} from 'react';
import FacebookEmoji from 'react-facebook-emoji';
import IntlMessages from "../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
import {TweenMax} from "gsap/TweenMax";

var classNames = require('classnames');


class RowShowComments extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"title",
            name:"ehsan",
            detail:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet " +
                "bibendum enim. In massa tempor nec feugiat. Nunc aliquet bibendum enim facilisis gravida. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. " +
                "Amet luctus venenatis lectus magna fringilla. Volutpat maecenas volutpat blandit aliquam etiam erat" +
                " velit scelerisque in. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Sagittis orci a ",
            data:"97/6/2019",
            emoji:"like"
        }
    }
    componentDidMount(){
        let {index}=this.props;
        switch(index) {
            case 1:
                this.setState({
                    emoji:"love"
                });
                // code block
                break;
            case 2:
                this.setState({
                    emoji:"wow"
                });
                // code block
                break;
            case 3:
                this.setState({
                    emoji:"yay"
                });
                // code block
                break;
            case 4:
                this.setState({
                    emoji:"angry"
                });
                // code block
                break;
            case 5:
                this.setState({
                    emoji:"haha"
                });
                // code block
                break;
            case 6:
                this.setState({
                    emoji:"like"
                });
                // code block
                break;
            case 0:
                this.setState({
                    emoji:"sad"
                });
                // code block
                break;
            default:
                this.setState({
                    emoji:"like"
                });
            // code block
        }
    }

    render() {
        let{index,Name,input}=this.props ;
        let {title,name,detail,data,emoji,item}=this.state;
        console.log(input);
        // "Comment": "this is comments",
        //     "CommentId": "5d3da36669808adf0eb7ba61",
        //     "Created_at": "2019-07-28 18:00:14.722000",
        return (
            <div className="col-12">
                <Card>
                 <div className="position-relative d-flex justify-content-center mt-2">
                     <FacebookEmoji type={emoji} size="xl"/>
                 </div>
                    <CardBody>
                        <div className="d-flex">
                            {/*<div className="mr-auto" >*/}
                                {/*<span>{name}: </span><h4 className="mb-4">{title}</h4>*/}
                            {/*</div>*/}
                            <div >
                                <span>item: </span><h4 className="mb-4">{Name}</h4>
                            </div>
                        </div>

                        <h6 className="mb-4 d-flex text-justify">{input.Comment}</h6>
                        <footer>
                            <p className="text-muted text-small mb-0 font-weight-light">
                                {input.Created_at.slice(0,10)}
                            </p>
                        </footer>
                    </CardBody>
                </Card>
                {/*<Modal isOpen={this.state.modal} toggle={this.toggle}>*/}
                    {/*<ModalHeader toggle={this.toggle}>*/}
                        {/*<IntlMessages id="Delete Item" />*/}
                    {/*</ModalHeader>*/}
                    {/*<ModalBody>*/}
                        {/*Are You Really fucking sure ?*/}
                    {/*</ModalBody>*/}
                    {/*<ModalFooter>*/}
                        {/*<Button color="primary" onClick={this.DeleteItem}>*/}
                            {/*Delete Item*/}
                        {/*</Button>{" "}*/}
                        {/*<Button color="secondary" onClick={this.toggle}>*/}
                            {/*Cancel*/}
                        {/*</Button>*/}
                    {/*</ModalFooter>*/}
                {/*</Modal>*/}

            </div>

        );
    }
}

export default RowShowComments;