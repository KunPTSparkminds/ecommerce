import Image from "next/image";
import * as React from "react";
import banner from "../../../public/images/banner.jpg";
interface BannerProps {}

const Banner: React.FunctionComponent<BannerProps> = (props) => {
  return (
    <div className="banner">
      <Image alt="One piece" src={banner} />
    </div>
  );
};

export default Banner;
