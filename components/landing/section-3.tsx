import { Input } from "antd";
import * as React from "react";

interface SectionThreeProps {}

const SectionThree: React.FunctionComponent<SectionThreeProps> = (props) => {
  return (
    <div className="section-3">
      <h2>JOIN TO THE NEWSLETTER</h2>
      <p>
        Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore
      </p>
      <Input
        placeholder="Email Address..."
        addonAfter={
          <div>
            <span>SUBSCRIBE</span>
          </div>
        }
      />
    </div>
  );
};

export default SectionThree;
