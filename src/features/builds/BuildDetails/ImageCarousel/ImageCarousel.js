import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Styles
import * as Styled from "features/builds/BuildDetails/ImageCarousel/ImageCarousel.style";

const ImageCarousel = ({ images }) => {
  return (
    <Styled.Wrapper>
      <Swiper
        loop
        slidesPerView={4}
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{ disableOnInteraction: false }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <Styled.Image alt="build image" src={image.url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Styled.Wrapper>
  );
};

export default ImageCarousel;
