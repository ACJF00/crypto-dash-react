import React from "react";
import { useState } from "react";
import HowMuchETH from "../components/HowMuchETH";
import HowMuchBSC from "../components/HowMuchBSC";

const HowMuchGlobal = () => {
  const [network, setNetwork] = useState("ETH");

  const Render = () => {
    if (network === "ETH") {
      return <HowMuchETH />;
    } else {
      return <HowMuchBSC />;
    }
  };

  const onChange = (e) => {
    setNetwork(e.target.value);
  };

  return (
    <div className="howmuch-global">
      <label>
        Select your network
        <select onChange={onChange}>
          <option value="ETH">ETH</option>
          <option value="BSC">BSC</option>
        </select>
      </label>
      <div className="selected-network">
        <Render />
      </div>
    </div>
  );
};

export default HowMuchGlobal;
