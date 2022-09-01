import { useState, useEffect } from "react";
import colors from "../styles/_settings.scss";
import ReactTooltip from "react-tooltip";

const PercentRelease = (SingleCoin) => {
  const maximumSupply = SingleCoin?.value?.market_data?.max_supply;
  const percentreleased =
    (SingleCoin?.value.market_data?.circulating_supply / maximumSupply) * 100;

  const [color, setColor] = useState();
  const [toolTip, setToolTip] = useState();

  useEffect(() => {
    ReactTooltip.rebuild();
    if (percentreleased) {
      if (percentreleased >= 70) {
        setColor(colors.green1);
        setToolTip(
          "Projects with more than 70% released are considred as the most secured investments"
        );
      } else if (45 <= percentreleased && percentreleased <= 69) {
        setColor(colors.red1);
        setToolTip(
          "Projects with a release between 45% and 69% may be considered more risky"
        );
      }
    } else {
      setColor(colors.red2);
      setToolTip(
        "Projects with less than 45% released may present a risk. The future inflation could take the price down"
      );
    }
  }, [percentreleased]);

  return maximumSupply ? (
    <p>
      % released :{" "}
      <span data-tip={toolTip} style={{ color }}>
        {percentreleased.toFixed(2)}%
      </span>
    </p>
  ) : (
    <div className="undisplayed"></div>
  );
};

export default PercentRelease;
