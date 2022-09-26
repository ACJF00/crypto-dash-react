import React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown, Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/user.actions";

const SearchBar = ({ placeholder, coinsData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchCoin, setSearchCoin] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [showLinks, setShowLinks] = useState(false);
  // const [userInfos, setUserInfos] = useState("");

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  // useEffect(() => {
  //   let userInfo = localStorage.getItem("userInfo");
  //   setUserInfos(JSON.parse(userInfo));
  // }, []);

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
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">The Crypto Guetter</Navbar.Brand>
        <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
          <ul className="navbar_links">
            <Nav>
              {/* <li className="navbar_item slideInDown-1"> */}
              <Link to="/" className="navbar_link" onClick={handleShowLinks}>
                Accueil
              </Link>
              {/* </li> */}
            </Nav>
            <Nav>
              {/* <li className="navbar_item slideInDown-2"> */}
              <Link
                to="./pages/HowMuch"
                className="navbar_link"
                onClick={handleShowLinks}
              >
                How much
              </Link>
              {/* </li> */}
            </Nav>
            <Nav>
              {userInfo ? (
                <>
                  <NavDropdown
                    title={`${userInfo?.name}`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/pages/profile">
                      My Profile
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item to="/" onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link
                    href="./pages/login"
                    className="navbar_link"
                    onClick={handleShowLinks}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    to="./pages/register"
                    className="navbar_link"
                    onClick={handleShowLinks}
                  >
                    Sign up
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="ms-auto mr-2">
              {/* <li className="navbar_item slideInDown-4"> */}
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
                        <a className="dataItem" href={`../pages/${coin.id}`}>
                          {coin.symbol}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* </li> */}
            </Nav>
          </ul>
          <button className="navbar_burger" onClick={handleShowLinks}>
            <span className="burger_bar"></span>
          </button>
        </nav>
      </Container>
    </Navbar>
  );
};

export default SearchBar;
