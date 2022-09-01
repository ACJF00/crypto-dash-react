import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = ({ placeholder }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchCoin, setSearchCoin] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    let IDdataArray = [];

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h"
      )
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          let symbol = res.data[i].symbol.toLocaleString();
          IDdataArray.push({
            symbol,
          });
        }
        setSearchCoin(IDdataArray);
      });
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = searchCoin.filter((value) => {
      return value.symbol.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {wordEntered.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((coin) => {
            return (
              <a className="dataItem" href={`./pages/${coin.symbol}`}>
                {coin.symbol}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

//   const Test = () => {
//         return (
//             <div>
//             searchCoin.map(coin => ({
//             <><p>Type to filter the list:
//                         <input
//                             id="filter"
//                             name="filter"
//                             type="text"
//                             value={coin.id}
//                             onChange={(event) => setFilter(event.target.value)} />
//                     </p><ul>
//                             {searchCoin
//                                 .filter((f) => f.includes(filter) || filter === "")
//                                 .map((f) => (
//                                     <li key={f}>{f}</li>
//                                 ))}
//                         </ul></>
//                     </div>
//             })
//         )
//   })}

//   return searchCoin.map((coin) => <p key={coin.symbol}>{coin.symbol}</p>);

//   return searchCoin.map((coin) => (
//     <>
//       <p>
//         Type to filter the list:
//         <input
//           name="filter"
//           type="text"
//           key={coin.symbol}
//           value={coin.symbol}
//           onChange={(event) => setFilter(event.target.value)}
//         />
//       </p>
//       <ul>
//         {searchCoin
//           .filter((f) => f.toString().includes(filter) || filter === "")
//           .map((f) => (
//             <li key={f}>{f}</li>
//           ))}
//       </ul>
//     </>
//   ));
