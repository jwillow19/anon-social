import React from 'react';
import { Link } from 'react-router-dom';
import './home.styles.scss';

const Home = () => {
  return (
    // <div className='jumbotron centered'>
    <div className='header'>
      <div className='text-box'>
        <h1 className='heading-primary'>
          <span className='heading-primary'> </span>
          <span className='heading-secondary'>Anonymous Share</span>
        </h1>
        <Link className='sign-in-login-btn' to='/register' role='button'>
          Sign Up
        </Link>
        <Link className='sign-in-login-btn' to='/login' role='button'>
          Login
        </Link>
      </div>
      {/* <i className='fas fa-key fa-6x'></i> */}

      <hr></hr>
    </div>
    // </div>
  );
};
export default Home;
