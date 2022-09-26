import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BalanceProfile.scss";
import Pagination from "../../components/Pagination";
import { v4 } from "uuid";
import { useSelector } from "react-redux";

const BalancesProfile = () => {
  const [balanceGen, setBalanceGen] = useState();
  const [answerAPIProfile, setAnswerAPIProfile] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [tokenContract, setTokenContract] = useState("");
  const [address, setAddress] = useState(`${userInfo.address}`);
  const [answerAPI, setAnswerAPI] = useState([]);
  const [total, setTotal] = useState([]);
  const [decimals, setDecimals] = useState(18);

  const ETH1 = "1";
  const AVAX2 = "43114";
  const BSC0 = "56";
  const POLYGON3 = "137";
  const ARBITRUM4 = "42161";
  const FANTOM5 = "250";

  const BSCKEY = process.env.REACT_APP_BSC_API_KEY;
  const ETHKEY = process.env.REACT_APP_ETH_API_KEY;
  const FTMKEY = process.env.REACT_APP_FTM_API_KEY;
  const MATICKEY = process.env.REACT_APP_MATIC_API_KEY;
  const AVAXKEY = process.env.REACT_APP_AVAX_API_KEY;

  useEffect(() => {
    axios
      .all([
        axios.get(
          `https://api.covalenthq.com/v1/${BSC0}/address/${address}/balances_v2/?key=ckey_1806b12890354ecda55d2af4176`
        ),
        axios.get(
          `https://api.covalenthq.com/v1/${ETH1}/address/${address}/balances_v2/?key=ckey_1806b12890354ecda55d2af4176`
        ),
        axios.get(
          `https://api.covalenthq.com/v1/${AVAX2}/address/${address}/balances_v2/?key=ckey_1806b12890354ecda55d2af4176`
        ),
        axios.get(
          `https://api.covalenthq.com/v1/${POLYGON3}/address/${address}/balances_v2/?key=ckey_1806b12890354ecda55d2af4176`
        ),
        axios.get(
          `https://api.covalenthq.com/v1/${ARBITRUM4}/address/${address}/balances_v2/?key=ckey_1806b12890354ecda55d2af4176`
        ),
        axios.get(
          `https://api.covalenthq.com/v1/${FANTOM5}/address/${address}/balances_v2/?key=ckey_1806b12890354ecda55d2af4176`
        ),
      ])
      .then(
        axios.spread((...res) => {
          setAnswerAPIProfile(res);
        })
      );
  }, [address]);

  useEffect(() => {
    let holdingArray = [];
    for (let i = 0; i < answerAPIProfile?.length; i++) {
      for (let j = 0; j < answerAPIProfile[i]?.data.data.items.length; j++) {
        if (
          answerAPIProfile?.[i]?.data?.data?.items[j].quote_24h !== null ||
          answerAPIProfile?.[i]?.data?.data?.items[j].contract_ticker_symbol !==
            null ||
          answerAPIProfile?.[i]?.data?.data?.items[j].balance !== "0"
        ) {
          holdingArray.push({
            ticker:
              answerAPIProfile?.[i]?.data?.data?.items[j]
                .contract_ticker_symbol,
            balance: Number(
              answerAPIProfile?.[i]?.data?.data?.items[j].balance
            ),
            contract:
              answerAPIProfile?.[i]?.data?.data?.items[j].contract_address,
            decimals:
              answerAPIProfile?.[i]?.data?.data?.items[j].contract_decimals,
            chainId: answerAPIProfile?.[i]?.data?.data.chain_id,
            value:
              answerAPIProfile?.[i]?.data?.data?.items[j].quote_rate *
              (answerAPIProfile?.[i]?.data?.data?.items[j].balance /
                Math.pow(
                  10,
                  answerAPIProfile?.[i]?.data?.data?.items[j].contract_decimals
                )),
          });
        }
      }
    }
    // }
    setBalanceGen(holdingArray);
  }, [answerAPIProfile]);

  const ChainIdHandler = ({ chainid }) => {
    if (chainid === 56) {
      return <p>BSC</p>;
    } else if (chainid === 43114) {
      return <p>Avalanche</p>;
    } else if (chainid === 1) {
      return <p>Ethereum</p>;
    } else if (chainid === 137) {
      return <p>Polygon</p>;
    } else if (chainid === 42161) {
      return <p>Arbitrum</p>;
    } else if (chainid === 250) {
      return <p>Fantom</p>;
    }
  };

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const sortedBalanceGen = balanceGen
    ?.sort((a, b) => b.value - a.value)
    // eslint-disable-next-line array-callback-return
    .map((coin) => {
      if (coin?.ticker !== null && coin?.value !== 0) {
        return { coin };
      }
      return null;
    })
    .filter((coin) => coin !== null);

  const currentRecords = balanceGen
    ?.sort((a, b) => b.value - a.value)
    // eslint-disable-next-line array-callback-return
    .map((coin) => {
      if (coin?.ticker !== null && coin?.value !== 0) {
        return { coin };
      }
      return null;
    })
    .filter((coin) => coin !== null)
    .slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(sortedBalanceGen?.length / recordsPerPage);

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
    <div className="container">
      <div className="holdings">
        {currentRecords?.map((coin) => {
          return (
            <div className="holding" key={v4()}>
              <p>{coin?.coin?.ticker}</p>
              <p>
                {(
                  coin?.coin?.balance / Math.pow(10, coin?.coin?.decimals)
                ).toFixed(2)}
              </p>
              <p>{(coin?.coin?.value).toFixed(2)}$</p>
              <ChainIdHandler chainid={coin?.coin?.chainId} />{" "}
              <button
                onClick={() =>
                  setTokenContract(coin?.coin?.contract.toLowerCase())
                }
              >
                How much
              </button>
            </div>
          );
        })}
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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

export default BalancesProfile;
