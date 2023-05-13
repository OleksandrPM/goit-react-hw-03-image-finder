import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

function ImageGalleryItem({ image, openModal }) {
  const { webformatURL, tags } = image;

  return (
    <li className={css.gallery_item} onClick={openModal}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
}
