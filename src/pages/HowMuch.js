import { useState, useEffect } from "react";
import axios from "axios";

const HowMuch = () => {
  //   const [tokenContract, setTokenContract] =
  //     useState(0x0000000de40dfa9b17854cbc7869d80f9f98d823);
  //   const [addressERC20, setAddressERC20] =
  //     useState(0x6b8b0086c98fd46cc60ee03e5bc7116cd414b85c);
  const [answerAPI, setAnswerAPI] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x66761Fa41377003622aEE3c7675Fc7b5c1C2FaC5&address=0x6b8b0086c98fd46cc60ee03e5bc7116cd414b85c&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=9NV4GKH8MXB93DC27DIQWRINTSFDG1TGGR"
      )
      .then((res) => setAnswerAPI(res.data.result));
  }, []);

  //   const priceValue = () => {
  //     let datasArray = []
  //     answerAPI.map((coin) => {
  //         return (
  //             datasArray.push(coin.value);
  //       });
  //   }

  useEffect(() => {
    let dataArray = [];
    for (let i = 0; i < answerAPI.length; i++) {
      if (answerAPI[i].to === "0x6b8b0086c98fd46cc60ee03e5bc7116cd414b85c")
        dataArray.push({
          value: Number(answerAPI[i].value / 1000000000000000000),
        });
    }
    setTotal(dataArray);
  }, [answerAPI]);

  const totaltotal = total.reduce((a, v) => (a = a + v.value), 0);

  return <div>{totaltotal}</div>;
};

export default HowMuch;
