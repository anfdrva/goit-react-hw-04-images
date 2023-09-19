import { Component } from "react";
import SearchBar from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchImages } from "api";
import { AppStyled } from "./App.styled";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";
import { Button } from "./Button/Button";



export class App extends Component { 
    state = {
        value: '',
        images: [],
        page: 1,
        loader: false,
        showModal: false,
        largeImage: '',
    };

    handlerSubmit = value => {
        this.setState({ value, page: 1, images: [] });
    };

    handlerClick = () => {
        this.setState(prevState => ({ page: prevState + 1 }));
    };

    openModal = index => {
        this.setState(({ images }) => ({
            showModal: true,
            largeImage: images[index].largeImageURL,
        }))
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({ showModal: !showModal }));
    }

    nextPage = () => {
        this.setState(({page}) =>({page: page + 1}))
    }

    async componentDidUpdate(prevPops, prevState) {

        if (prevState.value !== this.state.value || prevState.page !== this.state.page) {
            this.setState({ loader: true });

            try {
                const images = await fetchImages(this.state.value, this.state.page);
                this.setState(prevState => {
                    return {
                        images: [...prevState.images, ...images.hits],
                        showBtn: this.state.page < Math.ceil(images.totalHits / 20)
                    };
                });
                //console.log(imagesItem.hits)
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.setState({loader: false})
            }

        }
        
    }


    
    render() {
        return (
            <AppStyled>
                <SearchBar onSubmit={this.handlerSubmit} />
                {this.state.images.length > 0 && (<ImageGallery items={this.state.images} openModal={this.openModal} />)}
                {this.state.showModal && (<Modal toggleModal={this.toggleModal} largeImage={this.state.largeImage} />)}
                {this.state.loader && <Loader />}
                {this.state.images.length >= 12 && <Button nextPage={this.nextPage} />}
            </AppStyled>
        )
    }
}

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
