import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import './imageSlide.scss';

export default function ImageSlide({ imageUrls }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div id="imageSlideContainer">
      <div className="largeImageContainer">
        {imageUrls && (
          <img className="largeImage" src={imageUrls[selectedImage]} />
        )}
      </div>
      <div className="previewContainer">
        {imageUrls &&
          imageUrls.map((url, index) => (
            <div
              style={{ backgroundImage: 'url(' + url + ')' }}
              key={`img-slide-${index}`}
              className={
                'previewItem' + (index === selectedImage ? ' selected' : '')
              }
              onClick={() => {
                setSelectedImage(index);
              }}
            ></div>
          ))}
      </div>
    </div>
  );
}

ImageSlide.propTypes = {
  imageUrls: PropTypes.array.isRequired
}