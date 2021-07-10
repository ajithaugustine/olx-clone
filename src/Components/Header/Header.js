import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";
function Header() {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };

  return (
    <div className="headerParentDiv">
      <div className="brandName ml-2" onClick={() => history.push("/")}>
        <OlxLogo></OlxLogo>
      </div>
      <div className="headerChildDiv">
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>

        <div className="loginPage">
          {user ? (
            <Link to={`/profile/${user.uid}`}>
              <h6>{user.displayName}</h6>
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        <div>
          {user ? (
            <a id="signout" onClick={signout}>
              Signout
            </a>
          ) : (
            <Link id="Signup" to="/signup">
              Signup
            </Link>
          )}
        </div>

        <Link to="/sell">
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
