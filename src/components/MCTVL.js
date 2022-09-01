import React from "react";
import { useEffect, useState } from "react";
import colors from "../styles/_settings.scss";
import ReactTooltip from "react-tooltip";

const MCTVL = (SingleCoin) => {
  const MCFDVRatio = SingleCoin.value?.market_data?.mcap_to_tvl_ratio;

  const [color, setColor] = useState();
  const [toolTip, setToolTip] = useState();

  useEffect(() => {
    ReactTooltip.rebuild();
    if (MCFDVRatio) {
      if (MCFDVRatio < 0.15) {
        setToolTip("The ratio may shows that the project is undervalued");
        setColor(colors.green1);
      } else if (0.15 <= MCFDVRatio && MCFDVRatio <= 0.3) {
        setToolTip("The project seems to have a nice theorical progression");
        setColor(colors.red1);
      } else if (0.31 < MCFDVRatio && MCFDVRatio <= 0.7) {
        setToolTip("he project seems to be normal");
        setColor(colors.red1);
      }
    } else {
      setToolTip(
        "Market cap of less than $1 billion. Investing in low cap project presents a higher risk"
      );
      setColor(colors.red2);
    }
  }, [MCFDVRatio]);

  return (
    <div data-tip={toolTip} style={{ color }}>
      MC/TVL Ratio: {MCFDVRatio}
    </div>
  );
};

export default MCTVL;
