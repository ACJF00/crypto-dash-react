import { useState, useEffect } from "react";
import axios from "axios";

const HowMuch = () => {
  const [tokenContract, setTokenContract] = useState("");
  const [addressERC20, setAddressERC20] = useState("");
  const [answerAPI, setAnswerAPI] = useState([]);
  const [total, setTotal] = useState([]);
  const [decimals, setDecimals] = useState(18);

  const handleTokenContract = (event) => {
    const searchTokenContract = event.target.value;
    setTokenContract(searchTokenContract);
  };

  const handleAddress = (event) => {
    const searchAddress = event.target.value;
    setAddressERC20(searchAddress);
  };

  const clearToken = () => {
    setTokenContract("");
    setAddressERC20("");
    setTotal([]);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${addressERC20}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=9NV4GKH8MXB93DC27DIQWRINTSFDG1TGGR`
      )
      .then((res) => setAnswerAPI(res.data.result));
  }, [tokenContract, addressERC20]);

  useEffect(() => {
    let dataArray = [];
    for (let i = 0; i < answerAPI.length; i++) {
      let toLower = answerAPI[i]?.to?.toLowerCase();
      let addressLower = addressERC20?.toLowerCase();
      if (toLower === addressLower) {
        dataArray.push({
          ticker: answerAPI[0].tokenSymbol,
          value: Number(answerAPI[i].value),
        });
      }
    }
    setDecimals(Number(answerAPI[0]?.tokenDecimal));
    setTotal(dataArray);
  }, [addressERC20, answerAPI, decimals]);

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
    <div className="how-much">
      <div className="received-intro">
        <h1>Find out how much did you receive on a particular token</h1>
      </div>
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
          value={addressERC20}
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
  );
};

export default HowMuch;
