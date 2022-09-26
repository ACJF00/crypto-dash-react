import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./HowMuchProfile.scss";

const HowMuchProfile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [tokenContract, setTokenContract] = useState("");
  const [address, setAddress] = useState(`${userInfo.address}`);
  const [answerAPI, setAnswerAPI] = useState([]);
  const [total, setTotal] = useState([]);
  const [decimals, setDecimals] = useState(18);

  const BSCKEY = process.env.REACT_APP_BSC_API_KEY;
  const ETHKEY = process.env.REACT_APP_ETH_API_KEY;
  const FTMKEY = process.env.REACT_APP_FTM_API_KEY;
  const MATICKEY = process.env.REACT_APP_MATIC_API_KEY;
  const AVAXKEY = process.env.REACT_APP_AVAX_API_KEY;

  const [profileHoldings, setProfileHoldings] = useState([]);

  // console.log(`Adresse: ${address}`);
  // console.log(`Contrat: ${tokenContract}`);
  useEffect(() => {
    let holdingsArray = [];

    axios
      .all([
        axios.get(
          `https://api.ethplorer.io/getAddressInfo/${userInfo.address}?apiKey=freekey`
        ),
      ])
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res[0].data.tokens.length; i++) {
          holdingsArray.push({
            symbol: res[0].data.tokens[i].tokenInfo.symbol,
            balance: res[0].data.tokens[i].balance,
            decimals: res[0].data.tokens[i].tokenInfo.decimals,
            contract: res[0].data.tokens[i].tokenInfo.address,
          });
        }
        setProfileHoldings(holdingsArray);
      });
  }, [userInfo.address]);

  const handleTokenContract = (e) => {
    const searchTokenContract = e.target.value;
    setTokenContract(searchTokenContract);
  };

  const handleAddress = (e) => {
    const searchAddress = e.target.value;
    setAddress(searchAddress);
  };

  const clearToken = () => {
    setTokenContract("");
    setAddress("");
    setTotal([]);
  };

  useEffect(() => {
    axios
      .all([
        axios.get(
          `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${BSCKEY}`
        ),
        axios.get(
          `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${ETHKEY}`
        ),
        axios.get(
          `https://api.ftmscan.com/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}&page=1&offset=100&startblock=0&endblock=87025780&sort=asc&apikey=${FTMKEY}`
        ),
        axios.get(
          `https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}}&page=1&offset=100&startblock=0&endblock=87025780&sort=asc&apikey=${MATICKEY}`
        ),
        axios.get(
          `https://api.snowtrace.io/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}&page=1&offset=100&startblock=0&endblock=87025780&sort=asc&apikey=${AVAXKEY}`
        ),
      ])
      .then(
        axios.spread((...res) => {
          setAnswerAPI(res);
        })
      );
  }, [AVAXKEY, BSCKEY, ETHKEY, FTMKEY, MATICKEY, address, tokenContract]);

  useEffect(() => {
    if (answerAPI[0]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[0].data.result);
    } else if (answerAPI[1]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[1].data.result);
    } else if (answerAPI[2]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[2].data.result);
    } else if (answerAPI[3]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[3].data.result);
    } else if (answerAPI[4]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[4].data.result);
    }
  }, [answerAPI]);

  useEffect(() => {
    let dataArray = [];
    for (let i = 0; i < answerAPI.length; i++) {
      let toLower = answerAPI[i]?.to?.toLowerCase();
      let addressLower = address?.toLowerCase();
      if (toLower === addressLower) {
        dataArray.push({
          ticker: answerAPI[0].tokenSymbol,
          value: Number(answerAPI[i].value),
        });
      }
    }
    setDecimals(Number(answerAPI[0]?.tokenDecimal));
    setTotal(dataArray);
  }, [address, answerAPI, decimals]);

  const totaltotal = total.reduce((a, v) => (a = a + v.value), 0);

  const FinalTotal = () => {
    if (decimals === 6) {
      return (
        <div>
          {(totaltotal / 1000000).toFixed(2).toLocaleString()} {total[0].ticker}
        </div>
      );
    } else if (decimals === 18) {
      return (
        <div>
          {(totaltotal / 1000000000000000000).toFixed(2).toLocaleString()}{" "}
          {total[0].ticker}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="profile-holdings">
        <h1>My holdings</h1>
        {profileHoldings.map((coin) => {
          return (
            <div className="holdings">
              <button
                onClick={() => setTokenContract(coin.contract.toLowerCase())}
              >
                {coin.symbol}
              </button>
              <p>{coin.balance / Math.pow(10, coin.decimals)}</p>
            </div>
          );
        })}
      </div>
      <div className="how-much">
        <div className="token-contract">
          <input
            type="text"
            placeholder="Token Contract Address"
            value={tokenContract}
            onChange={handleTokenContract}
          />
          <input
            type="text"
            placeholder="ERC20 Address"
            value={address.toLowerCase()}
            onChange={handleAddress}
          />
        </div>
        {totaltotal !== 0 && (
          <div className="show-total-received">
            <div className="total-received">
              <FinalTotal />
            </div>
            <div>{total.ticker}</div>
          </div>
        )}
        <button className="btn btn-info" onClick={clearToken}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default HowMuchProfile;
