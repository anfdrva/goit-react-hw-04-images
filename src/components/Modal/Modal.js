import { Component } from "react";
import { ModalContainer, Overlay } from "./Modal.styled";

export default class Modal extends Component{

    componentDidMount() {
        window.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlerKeyDown)
    }

    handlerKeyDown = evt => {
        evt.code === 'Escape' && this.props.toggleModal();
    }

    handlerBackdropClick = evt => {
        evt.target === evt.currentTarget && this.props.toggleModal();
    }

    render() {
        return (
            <Overlay onClick={this.handlerBackdropClick}>
                <ModalContainer >
                    <img src={this.props.largeImage} alt=""/>
                </ModalContainer>
            </Overlay>
        )
    }
}