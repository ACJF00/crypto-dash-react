import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FDV from "../components/FDV";
import MaxSupply from "../components/MaxSupply";
import DaysSinceATH from "../components/DaysSinceATH";
import SingleCoinChart from "../components/CoinChart";
import PercentRelease from "../components/PercentRelease";
import SingleCoinCap from "../components/SingleCoinCap";
import ReactTooltip from "react-tooltip";
import MCTVL from "../components/MCTVL";

const SingleCoin = () => {
  const { id } = useParams();
  const [SingleCoin, setSingleCoin] = useState({ id });

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => setSingleCoin(res.data));
  }, [id]);
  return (
    <article className="singleCoin">
      <div className="img">
        <img src={SingleCoin.image?.large} alt="logo" />
      </div>
      <h1>
        <span className="symbol">{SingleCoin.symbol}</span>
      </h1>
      <div className="singleCoinCards">
        <div className="card" id="currentDatas">
          <p>
            Price:{" "}
            {SingleCoin?.market_data?.current_price?.usd.toLocaleString()}$
          </p>
          <p>MC Rank: {SingleCoin.market_cap_rank}</p>
          <p>
            Liquidity score: {Number(SingleCoin.liquidity_score).toFixed(2)}
          </p>
        </div>
        <div className="card" id="financialDatas">
          <p>
            Market cap: $
            {SingleCoin?.market_data?.market_cap?.usd.toLocaleString()}
          </p>
          <FDV value={SingleCoin} />
          <p>
            Circulating supply:{" "}
            {SingleCoin?.market_data?.circulating_supply.toLocaleString()}{" "}
            <span className="symbol">{SingleCoin.symbol}</span>
          </p>
          <MaxSupply value={SingleCoin} />
        </div>
        <div className="card" id="athDatas">
          <p>
            % since ATH:{" "}
            {SingleCoin?.market_data?.ath_change_percentage?.usd.toFixed(2)}%
          </p>
          <p>
            % since ATL:{" "}
            {SingleCoin?.market_data?.atl_change_percentage?.usd
              .toFixed(2)
              .toLocaleString()}
            %
          </p>
          <DaysSinceATH value={SingleCoin} />
        </div>
        <div className="card" id="healt-analysis">
          <PercentRelease value={SingleCoin} />
          <SingleCoinCap value={SingleCoin} />
          <MCTVL value={SingleCoin} />
        </div>
      </div>
      <SingleCoinChart coinId={id} coinName={SingleCoin.name} />
      <a
        href={`https://www.binance.com/en/trade/${SingleCoin?.symbol}_USDT?ref=17696563`}
      >
        <button>Trade it on Binance</button>
      </a>
      <br />
      <ReactTooltip />
    </article>
  );
};

export default SingleCoin;
