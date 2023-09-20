import { useEffect } from "react";
import { ModalContainer, Overlay } from "./Modal.styled";

const Modal = ({toggleModal, largeImage}) => {

    useEffect(() => {
        window.addEventListener('keydown', handlerKeyDown);
        return () => {
            window.removeEventListener('keydown', handlerKeyDown)
        };
    })

    const handlerKeyDown = evt => {
        evt.code === 'Escape' && toggleModal();
    }

    const handlerBackdropClick = evt => {
        evt.target === evt.currentTarget && toggleModal();
    }

    return (
        <Overlay onClick={handlerBackdropClick}>
            <ModalContainer >
                <img src={largeImage} alt=""/>
            </ModalContainer>
        </Overlay>
    )
}

export default Modal;