import React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = ({ placeholder, coinsData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchCoin, setSearchCoin] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    let IDdataArray = [];
    for (let i = 0; i < coinsData.length; i++) {
      IDdataArray.push({
        symbol: coinsData[i].symbol,
        id: coinsData[i].id,
      });
    }
    setSearchCoin(IDdataArray);
  }, [coinsData]);

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
              <a className="dataItem" href={`./pages/${coin.id}`}>
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
