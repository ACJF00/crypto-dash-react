import { useState, useEffect } from "react";
import axios from "axios";

const HowMuchBSC = () => {
  const [tokenContract, setTokenContract] = useState("");
  const [addressBSC, setAddressBSC] = useState("");
  const [answerAPI, setAnswerAPI] = useState([]);
  const [total, setTotal] = useState([]);
  const [decimals, setDecimals] = useState(18);

  const handleTokenContract = (event) => {
    const searchTokenContract = event.target.value;
    setTokenContract(searchTokenContract);
  };

  const handleAddress = (event) => {
    const searchAddress = event.target.value;
    setAddressBSC(searchAddress);
  };

  const clearToken = () => {
    setTokenContract("");
    setAddressBSC("");
    setTotal([]);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${addressBSC}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=ZB8P6UVJGEEC6RTX2GBYPTU9JDHZXX4Z8S`
      )
      .then((res) => setAnswerAPI(res.data.result));
  }, [tokenContract, addressBSC]);

  useEffect(() => {
    let dataArray = [];
    for (let i = 0; i < answerAPI.length; i++) {
      let toLower = answerAPI[i]?.to?.toLowerCase();
      let addressLower = addressBSC?.toLowerCase();
      if (toLower === addressLower) {
        dataArray.push({
          ticker: answerAPI[0].tokenSymbol,
          value: Number(answerAPI[i].value),
        });
      }
    }
    setDecimals(Number(answerAPI[0]?.tokenDecimal));
    setTotal(dataArray);
  }, [addressBSC, answerAPI, decimals]);

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
          placeholder="BSC Address"
          value={addressBSC}
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

export default HowMuchBSC;
