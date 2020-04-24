import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './navbar.styles.scss';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authNav = (
    <Fragment>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='#/'>
            Logo Here
          </Link>
        </li>
      </ul>
      <ul className='navbar-nav navbar-right'>
        <li className='nav-item'>
          <Link className='nav-link' to='/posts'>
            Posts
          </Link>
        </li>
        <li>
          <a className='nav-link' onClick={logout} href='#!'>
            {' '}
            Logout{' '}
          </a>
        </li>
      </ul>
    </Fragment>
  );

  const guestNav = (
    <Fragment>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/'>
            Logo Here
          </Link>
        </li>
      </ul>
      <ul className='navbar-nav navbar-right'>
        <li>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
        <li>
          <Link className='nav-link' to='/register'>
            Register
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  // Render authNav if JWT in header
  function RenderNav() {
    if (isAuthenticated) {
      return authNav;
    } else {
      return guestNav;
    }
  }

  return (
    <nav className='navbar navbar-expand-md navbar-dark navbar-default'>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <RenderNav />
      </div>
    </nav>
  );
};

Navbar.prototype = {
  // logout action
  logout: PropTypes.func.isRequired,
  // state object mapped to props
  auth: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProp, { logout })(Navbar);
