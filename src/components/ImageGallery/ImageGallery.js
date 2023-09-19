import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { ImageGalleryStyled } from "./ImageGallery.styled"


export const ImageGallery = ({items, openModal}) => {
    return (
        <ImageGalleryStyled className="gallery">
            {items.map(({id, webformatURL}, index) => (
                <ImageGalleryItem key={id} index={index} webformatURL={webformatURL} openModal={openModal} />
            ))}
        </ImageGalleryStyled>
    )
}