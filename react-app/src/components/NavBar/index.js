import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import DemoButton from '../auth/DemoButton';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from "../Search/index";
import "./index.css";

const NavBar = () => {

  const user = useSelector((state) => (state.session.user));
  const history = useHistory();

  return (
    <nav>
      <div className="navbar-container">
        <div onClick={() => history.push("/")} className="navbar-element">
          <p>Home</p>
        </div>
        <div onClick={() => history.push("/all")} className="navbar-element">
          <p>All</p>
        </div>
        <div onClick={() => history.push("/subfeedits")} className="navbar-element">
          <p>Subfeedits</p>
        </div>
        <div className="navbar-component">
          <SearchBar />
        </div>
        {!user ? <>
          <div onClick={() => history.push("/login")} className="navbar-element">
            <p>Login</p>
          </div>
          <div className="navbar-component">
            <DemoButton />
          </div>
          <div onClick={() => history.push("/sign-up")} className="navbar-element">
            <p>Sign up</p>
          </div>
        </> : <>
          <div onClick={() => history.push("/subscriptions")} className="navbar-element">
            <p>Subscriptions</p>
          </div>
          <div>
          </div>
          <div className="navbar-component">
            <LogoutButton />
          </div>
        </>}
      </div>
    </nav>
  );
}

export default NavBar;
