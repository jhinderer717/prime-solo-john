import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = (props) => {

  const [showMenu, setShowMenu] = useState(false)

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Dashboard';
  }

  let menu

  if(showMenu){
    menu = 
    <div className="nav-right"
    onClick={() => setShowMenu(!showMenu)}>
      <Link className="nav-link top-button" to={loginLinkData.path}>
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {loginLinkData.text}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.store.user.id && (
        <>
          <Link className="nav-link" to="/addRound">
            Submit New Round
          </Link>
          <Link className="nav-link" to="/breakdown">
            Breakdown
          </Link>
          <Link className="nav-link" to="/edit">
            Edit
          </Link>
          <LogOutButton className="nav-link" />
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
    </div>
  }


  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">HandicApp</h2>
      </Link>

        <span className="hamburger-right"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FontAwesomeIcon 
            icon={faBars}
            // onClick={() => setShowMenu(!showMenu)}
          />
        </span>
        <br/>
        {menu}

    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
