import React from "react";
import { useState } from "react";
import HowMuchETH from "../components/HowMuchETH";
import HowMuchBSC from "../components/HowMuchBSC";
import HowMuchPolygon from "../components/HowMuchPolygon";
import HowMuchFTM from "../components/HowMuchFTM";

const HowMuchGlobal = () => {
  const [network, setNetwork] = useState("ETH");

  const Render = () => {
    if (network === "ETH") {
      return <HowMuchETH />;
    } else if (network === "BSC") {
      return <HowMuchBSC />;
    } else if (network === "MATIC") {
      return <HowMuchPolygon />;
    } else if (network === "FTM") {
      return <HowMuchFTM />;
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
          <option value="MATIC">Polygon</option>
          <option value="FTM">Fantom</option>
        </select>
      </label>
      <div className="selected-network">
        <Render />
      </div>
    </div>
  );
};

export default HowMuchGlobal;
