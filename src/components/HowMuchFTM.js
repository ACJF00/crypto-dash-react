import { useState, useEffect } from "react";
import axios from "axios";

const HowMuchFTM = () => {
  const [tokenContract, setTokenContract] = useState("");
  const [addressFTM, setAddressFTM] = useState("");
  const [answerAPI, setAnswerAPI] = useState([]);
  const [total, setTotal] = useState([]);
  const [decimals, setDecimals] = useState(18);

  const handleTokenContract = (event) => {
    const searchTokenContract = event.target.value;
    setTokenContract(searchTokenContract);
  };

  const handleAddress = (event) => {
    const searchAddress = event.target.value;
    setAddressFTM(searchAddress);
  };

  const clearToken = () => {
    setTokenContract("");
    setAddressFTM("");
    setTotal([]);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.ftmscan.com/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${addressFTM}&page=1&offset=100&startblock=0&endblock=87025780&sort=asc&apikey=GUSQQCNYUZAWRKKZ69H2RV4WEUZPFXX5U7`
      )
      .then((res) => setAnswerAPI(res.data.result));
  }, [tokenContract, addressFTM]);

  useEffect(() => {
    let dataArray = [];
    for (let i = 0; i < answerAPI.length; i++) {
      let toLower = answerAPI[i]?.to?.toLowerCase();
      let addressLower = addressFTM?.toLowerCase();
      if (toLower === addressLower) {
        dataArray.push({
          ticker: answerAPI[0].tokenSymbol,
          value: Number(answerAPI[i].value),
        });
      }
    }
    setDecimals(Number(answerAPI[0]?.tokenDecimal));
    setTotal(dataArray);
  }, [addressFTM, answerAPI, decimals]);

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
          placeholder="Fantom Address"
          value={addressFTM}
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

export default HowMuchFTM;
