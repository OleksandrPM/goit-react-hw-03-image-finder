import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

export default ImageGallery;

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  openModal: PropTypes.func,
};

function ImageGallery({ gallery, openModal }) {
  return (
    <ul className={css.gallery}>
      {gallery.map(image => {
        return (
          <ImageGalleryItem image={image} key={image.id} onClick={openModal} />
        );
      })}
    </ul>
  );
}
