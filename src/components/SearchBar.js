import React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const SearchBar = ({ placeholder, coinsData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchCoin, setSearchCoin] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

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
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
      <ul className="navbar_links">
        <li className="navbar_item slideInDown-1">
          <Link to="/" className="navbar_link" onClick={handleShowLinks}>
            Accueil Local
          </Link>
        </li>
        <li className="navbar_item slideInDown-2">
          <Link
            to="./pages/HowMuchGlobal"
            className="navbar_link"
            onClick={handleShowLinks}
          >
            How much
          </Link>
        </li>
        <li className="navbar_item slideInDown-3">
          <a
            href="https://thecryptoguetter.netlify.app/"
            className="navbar_link"
            onClick={handleShowLinks}
          >
            Home
          </a>
        </li>
        <li className="navbar_item slideInDown-4">
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
        </li>
      </ul>
      <button className="navbar_burger" onClick={handleShowLinks}>
        <span className="burger_bar"></span>
      </button>
    </nav>
  );
};

export default SearchBar;
