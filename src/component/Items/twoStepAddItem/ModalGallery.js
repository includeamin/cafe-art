import React, {Component} from 'react';
import IntlMessages from "../../../helpers/IntlMessages";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import AddGalleryItem from "./AddGalleryItem";

class ModalGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalLong: false,
        };
    }
    toggleLarge = () => {
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    };

    render() {
        return (
            <div>
                <div>
                    <Button
                        className="mr-2 mb-2"
                        color="primary"
                        outline
                        onClick={this.toggleLarge}
                    >
                        <IntlMessages id="اضافه کردن عکس به گالری" />
                    </Button>

                    <Modal
                        isOpen={this.state.modalLarge}
                        size="lg"
                        toggle={this.toggleLarge}
                    >
                        <ModalHeader toggle={this.toggleLarge}>
                            Modal title
                        </ModalHeader>
                        <ModalBody>
                            <AddGalleryItem id={this.props.id} itemName={this.props.id}/>
                        </ModalBody>
                    </Modal>
            </div>
            </div>
        );
    }
}

export default ModalGallery;