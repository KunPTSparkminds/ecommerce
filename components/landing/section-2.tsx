import * as React from "react";
import { Product } from "../../models";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
interface SectionTwoProps {
  listProduct: Product[];
}

const SectionTwo: React.FunctionComponent<SectionTwoProps> = ({
  listProduct,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className="section-2">
      <h1>{`What's news at Kun's Shop?`}</h1>
      <Slider {...settings}>
        {listProduct &&
          listProduct.length > 0 &&
          listProduct.map((item, index) => (
            <div className="section-slider" key={index}>
              <Image alt="" src={item.image} width={350} height={250} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default SectionTwo;
