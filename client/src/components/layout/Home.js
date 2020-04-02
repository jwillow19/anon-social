import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='jumbotron centered'>
      <div className='container'>
        <i className='fas fa-key fa-6x'></i>
        <h1 className='display-3'>Secrets Share</h1>
        <p className='lead'>Anonymous Social Network</p>
        <hr></hr>
        <Link className='btn btn-light btn-lg' to='/register' role='button'>
          Sign Up
        </Link>
        <Link className='btn btn-dark btn-lg' to='/login' role='button'>
          Login
        </Link>
      </div>
    </div>
  );
};
export default Home;
