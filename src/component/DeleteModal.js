import React, {Component} from 'react';

import IntlMessages from "../helpers/IntlMessages";

import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";


class DeleteModal extends Component {
    render() {
        let{modal,toggle,handleDelete,header}=this.props;
        return (
            <Modal isOpen={modal} toggle={toggle} dir='rtl'>
                <ModalHeader toggle={toggle}>
                    <IntlMessages id={header} />
                </ModalHeader>
                <ModalBody>
                    <span className='float-right h3'>آیا شما مطمن هستید؟</span>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={ handleDelete} className='col-2 mr-2'>
                        حذف
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle} className='col-3 mr-2' >
                        لغو
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default DeleteModal;