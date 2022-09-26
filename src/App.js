import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalChart from "./components/GlobalChart";
import HeaderInfos from "./components/HeaderInfos";
import Table from "./components/Table";
import ToTop from "./components/ToTop";
import SingleCoin from "./pages/SingleCoin";
import SearchBar from "./components/SearchBar";
import HowMuchGlobal from "./pages/HowMuchGlobal";
import HowMuch from "./pages/HowMuch";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import HowMuchProfile from "./pages/HowMuchProfile/HowMuchProfile";
// import Moralis from "./pages/Moralis";
import BalancesProfile from "./pages/BalancesProfile/BalancesProfile";

const App = () => {
  const [coinsData, setCoinsData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y"
      )
      .then((res) => setCoinsData(res.data));

    window.addEventListener("scroll", () => {
      if (window.scrollY > 145) {
        document.querySelector(".table-header").classList.add("active");
      } else {
        document.querySelector(".table-header").classList.remove("active");
      }
    });
  }, []);

  const Home = () => {
    return (
      <>
        <div className="app-container">
          <header>
            <HeaderInfos />
            <GlobalChart coinsData={coinsData} />
          </header>
          <Table coinsData={coinsData} />
          <ToTop />
        </div>
      </>
    );
  };

  return (
    <Router>
      <SearchBar placeholder="Enter a ticker" coinsData={coinsData} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/pages/:id"
          element={<SingleCoin />}
          handler={coinsData.id}
        />
        <Route
          exact
          path="/pages/:id"
          element={<SearchBar />}
          handler={coinsData}
        />
        <Route exact path="/pages/howmuchGlobal" element={<HowMuchGlobal />} />
        <Route exact path="/pages/howmuch" element={<HowMuch />} />
        <Route exact path="/pages/login" element={<LoginScreen />} />
        <Route exact path="/pages/register" element={<RegisterScreen />} />
        <Route exact path="/pages/profile" element={<ProfileScreen />} />
        <Route
          exact
          path="/pages/howmuchprofile"
          element={<HowMuchProfile />}
        />
        <Route
          exact
          path="/pages/balance-profile"
          element={<BalancesProfile />}
        />
      </Routes>
    </Router>
  );
};

export default App;
