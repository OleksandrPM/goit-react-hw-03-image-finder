import { Component } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { getApiResponse, requestParameters } from 'pixabayApi/pixabay-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import css from './App.module.css';

class App extends Component {
  state = {
    searchString: '',
    gallery: [],
    isLoading: false,
    error: null,
    isModalOpen: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const {
      state: { searchString },
      updateGallery,
    } = this;

    if (prevState.searchString !== searchString) {
      requestParameters.page = 1;
      this.setState({ gallery: [] });

      if (searchString !== '') {
        updateGallery(this.state.searchString);
      }
    }
  }

  loadNextPage = () => {
    this.updateGallery(this.state.searchString);
  };

  updateGallery = searchString => {
    this.setState({ isLoading: true });
    try {
      getApiResponse(searchString).then(response => {
        this.setState({ gallery: [...this.state.gallery, ...response.hits] });
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getSearchString = value => {
    if (this.state.searchString !== value.searchString) {
      this.setState({ searchString: value.searchString });
    }
  };

  openModal = () => {};

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  //Where does it must to be?
  image = {};

  render() {
    const {
      state: { gallery, isLoading, isModalOpen },
      getSearchString,
      loadNextPage,
      openModal,
      closeModal,
    } = this;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={getSearchString} />

        {isLoading && requestParameters.page === 1 ? (
          <InfinitySpin width="200" color="#4fa94d" />
        ) : (
          <ImageGallery gallery={gallery} onClick={openModal} />
        )}

        {requestParameters.page !== 1 &&
          (isLoading ? (
            <InfinitySpin width="200" color="#4fa94d" />
          ) : (
            <Button onClick={loadNextPage} />
          ))}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <button type="button" onClick={closeModal}>
              Close modal
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
