import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ arrayImg = [] }) => {
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    if (arrayImg.length > 0) {
      setMainImage(arrayImg[0]);
    }
  }, [arrayImg]);

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: arrayImg?.length < 4 ? arrayImg?.length : 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  return (
    <div className="slider-container">
      <div>
        {mainImage ? (
          <img src={mainImage.image_file} alt="Main" className="main-image" />
        ) : (
          <p>No image available</p>
        )}
      </div>
      {arrayImg.length > 1 && (
        <div className="thumbnail-slider">
          <Slider {...settings}>
            {arrayImg.map((img, index) => (
              <div key={index} onClick={() => handleThumbnailClick(img)}>
                <img
                  src={img?.image_file || ""}
                  alt={`Thumbnail ${index}`}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
