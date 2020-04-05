import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

export const Login = () => {
  // [*]  Declaring form state and function to be used for state update
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // destructure formData for convenience
  const { email, password } = formData;
  // [*]  declare onChange function to update state
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // [*] create onSubmit function
  //  frontend - verify client credientials: email & password
  const onSubmit = async e => {
    e.preventDefault();
    // if correct email/password - login to see feed
    console.log(formData);
  };

  return (
    <Fragment>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-8'>
            <div className='card'>
              <div className='card-body'>
                <form onSubmit={e => onSubmit(e)}>
                  <h3>Sign in</h3>

                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control'
                      name='email'
                      // set value to associate with {name} variable
                      value={email}
                      // update input value by calling JS onChange function
                      onChange={e => onChange(e)}
                      required
                      placeholder='Email address'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control'
                      name='password'
                      // set value to associate with {name} variable
                      value={password}
                      // update input value by calling JS onChange function
                      onChange={e => onChange(e)}
                      required
                      placeholder='Password'
                    />
                  </div>

                  <button type='submit' className='btn btn-dark' value='Login'>
                    SIGN IN
                  </button>
                </form>
                <p>
                  Don't have an account?
                  <Link to='/register' className='btn btn-sm' role='button'>
                    SIGN UP
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className='col-sm-4'>
            <div className='card social-block'>
              <div className='card-body'>
                <a className='btn btn-block' href='/auth/google' role='button'>
                  <i className='fab fa-google'></i>
                  Sign Up with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
