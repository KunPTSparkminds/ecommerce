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
  };
  return (
    <div className="section-2">
      <Slider {...settings}>
        {listProduct &&
          listProduct.length > 0 &&
          listProduct.map((item, index) => (
            <div
              className="section-slider"
              key={index}
              style={{
                width: "400px",
                height: "400px",
              }}
            >
              <Image alt="" src={item.image} width={400} height={400    } />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default SectionTwo;
