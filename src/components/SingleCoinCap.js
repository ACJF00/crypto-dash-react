import React from "react";
import { useState, useEffect } from "react";
import colors from "../styles/_settings.scss";
import ReactTooltip from "react-tooltip";

const SingleCoinCap = (SingleCoin) => {
  const marketCap = SingleCoin.value?.market_data?.market_cap?.usd;

  const [cap, setCap] = useState();
  const [color, setColor] = useState();
  const [toolTip, setToolTip] = useState();

  useEffect(() => {
    ReactTooltip.rebuild();
    if (marketCap) {
      if (marketCap > 10000000000) {
        setToolTip("Market cap has to be more than $10 billion");
        setCap("Large cap");
        setColor(colors.green1);
      } else if (1000000000 <= marketCap && marketCap <= 9999999999) {
        setToolTip("Market cap between $1 billion and $10 billion");
        setCap("Middle cap");
        setColor(colors.red1);
      }
    } else {
      setToolTip(
        "Market cap of less than $1 billion. Investing in low cap project presents a higher risk"
      );
      setCap("Low cap");
      setColor(colors.red2);
    }
  }, [marketCap]);

  return (
    <div data-tip={toolTip} style={{ color }}>
      {cap}
    </div>
  );
};

export default SingleCoinCap;
