import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from "../Search/index";
import "./index.css";

const NavBar = () => {

  const user = useSelector((state) => (state.session.user));
  const history = useHistory();

  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-element">
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div className="navbar-element">
          <NavLink to="/all" exact={true} activeClassName="active">
            All
          </NavLink>
        </div>
        <div className="navbar-element">
          <NavLink to="/subfeedits" exact={true} activeClassName="active">
            Subfeedits
          </NavLink>
        </div>
        <div className="navbar-element">
          <SearchBar />
        </div>
        {!user ? <>
          <div className="navbar-element">
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div className="navbar-element">
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
        </> : <>
          <div className="navbar-element">
            <NavLink to="/subscriptions" exact={true} activeClassName="active">
              Subscriptions
            </NavLink>
          </div>
          <div className="navbar-element">
            <LogoutButton />
          </div>
        </>}
      </div>
    </nav>
  );
}

export default NavBar;
