import { useState, useEffect } from "react";
import axios from "axios";

const HowMuch = () => {
  const [tokenContract, setTokenContract] = useState("");
  const [addressERC20, setAddressERC20] = useState("");
  const [answerAPI, setAnswerAPI] = useState([]);
  const [total, setTotal] = useState([]);

  const handleTokenContract = (event) => {
    const searchTokenContract = event.target.value;
    setTokenContract(searchTokenContract);
  };

  const handleAddress = (event) => {
    const searchAddress = event.target.value;
    setAddressERC20(searchAddress);
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
      if (answerAPI[i].to === `${addressERC20}`) {
        console.log(answerAPI[i].to);
        dataArray.push({
          ticker: answerAPI[i].tokenSymbol,
          value: Number(answerAPI[i].value / 1000000000000000000),
        });
      }
    }
    setTotal(dataArray);
  }, [addressERC20, answerAPI]);

  const totaltotal = total.reduce((a, v) => (a = a + v.value), 0);

  return (
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
          value={addressERC20}
          onChange={handleAddress}
        />
      </div>
      {totaltotal !== 0 && (
        <div className="show-total-received">
          <div className="total-received">{totaltotal}</div>
          <div>{total.ticker}</div>
        </div>
      )}
    </div>
  );
};

export default HowMuch;
