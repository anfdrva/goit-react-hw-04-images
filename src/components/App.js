import { useEffect, useState } from "react";
import SearchBar from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchImages } from "api";
import { AppStyled } from "./App.styled";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";
import { Button } from "./Button/Button";


export const App = () => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const handlerSubmit = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(prevItem => !prevItem);
  };

  const nextPage = () => {
    setPage(prevItem => prevItem + 1);
  };

  useEffect(() => {
    async function getImages() {
      setLoader(true);
      try {
      const images = await fetchImages(value, page);
        setImages(prevItem => [...prevItem, ...images.hits]);
        
    }
    catch (error) {
      console.log(error);
    }
    finally {
        setLoader(false);
    }
    }
    if (value && (page === 1 || page !== 1)) {
      getImages();
    }
  }, [value, page])


  return (
          <AppStyled>
            <SearchBar onSubmit={handlerSubmit} />
            {images.length > 0 && (<ImageGallery items={images} openModal={openModal} />)}
            {showModal && (<Modal toggleModal={toggleModal} largeImage={largeImage} />)}
            {loader && <Loader />}
            {images.length >= 12 && <Button nextPage={nextPage} />}
          </AppStyled>
         )
}


