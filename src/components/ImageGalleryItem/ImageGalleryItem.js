import { ImageGalleryItemImage, ImageGalleryItemStyled } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({webformatURL, index, openModal}) => {
    return (
        <ImageGalleryItemStyled className="gallery-item">
            <ImageGalleryItemImage src={webformatURL} alt='' onClick={() => openModal(index)} />
        </ImageGalleryItemStyled>
    )
}
