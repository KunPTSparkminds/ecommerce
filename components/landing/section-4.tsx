import { Button } from "antd";
import * as React from "react";
import luffy from "../../public/images/luffy.jpg";
import chopper from "../../public/images/chopper.jpg";
import zoro from "../../public/images/zoro.jpg";
import onePiece from "../../public/images/onepiece.png";
import sanji from "../../public/images/sanji.png";
import Image from "next/image";

interface SectionFourProps {}
const ListImageUp = [
  {
    image: luffy,
    title: "Luffy",
  },
  {
    image: zoro,
    title: "Zoro",
  },
];
const ListImageDown = [
  {
    image: chopper,
    title: "Chopper",
  },
  {
    image: sanji,
    title: "Sanji",
  },
  {
    image: onePiece,
    title: "Onepiece",
  },
];
const SectionFour: React.FunctionComponent<SectionFourProps> = (props) => {
  return (
    <div className="section-4">
      <h2>PIRATE WORLD</h2>
      <div className="btn-explore">
        <Button>Explore</Button>
      </div>

      <div className="section-4__img">
        <div className="section-4__img__up">
          {ListImageUp.map((item, index) => (
            <div className={`item ${item.title.toLowerCase()}`} key={index}>
              <Image src={item.image} />
              <div className="title">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="section-4__img__up">
          {ListImageDown.map((item, index) => (
            <div className="item" key={index}>
              <Image src={item.image} />
              <div className="title">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionFour;
