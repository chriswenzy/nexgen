"use client";

import Slider from "react-slick";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { BsShieldCheck } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Carousel settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
};

const ProductCarousel = ({ featuredProducts }) => {
  return (
    <Slider {...sliderSettings}>
      {featuredProducts.map((product) => (
        <div key={product.id} className="px-2">
          <div className="paint-can-card bg-white rounded-4 p-4 shadow-lg position-relative">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={400}
              className="img-fluid"
            />
            <div className="text-center mt-3">
              <div className="h4 fw-bold mb-1">{product.name}</div>
              <div className="d-flex justify-content-center gap-2 mb-3">
                {product.oldPrice && (
                  <span className="text-decoration-line-through text-muted">
                    {product.oldPrice}
                  </span>
                )}
                <span className="h5 fw-bold text-danger">{product.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProductCarousel;
