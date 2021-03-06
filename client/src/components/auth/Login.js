import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import './auth.styles.scss';

export const Login = ({ login, isAuth }) => {
  // [*]  React State Hook - Declare form state and function to be used for state update (form update)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // destructure formData for convenience
  const { email, password } = formData;

  // [*]  declare onChange function to update state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // [*] onSubmit function
  //  frontend - verify client credientials: email & password
  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // [*] Redirect user to feed if isAuth = true (logged in)
  if (isAuth) {
    return <Redirect to='/chat' />;
  }

  return (
    <Fragment>
      <div className='section-auth mt-5'>
        <div className='row'>
          <div className='col-sm-12'>
            <h3 className='heading-secondary'>Sign in</h3>
            <div className='card'>
              <div className='card-body'>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control paragraph'
                      name='email'
                      // set value to associate with {name} variable
                      value={email}
                      // update input value by calling JS onChange function
                      onChange={(e) => onChange(e)}
                      required
                      placeholder='Email address'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control paragraph'
                      name='password'
                      // set value to associate with {name} variable
                      value={password}
                      // update input value by calling JS onChange function
                      onChange={(e) => onChange(e)}
                      required
                      placeholder='Password'
                    />
                  </div>

                  <button
                    type='submit'
                    className='sign-in-register-btn'
                    value='Login'
                  >
                    SIGN IN
                  </button>
                </form>
                <p>
                  Don't have an account?
                  <Link
                    to='/register'
                    className='btn paragraph btn-sm'
                    role='button'
                  >
                    SIGN UP
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  // define custom props
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  // map auth state isAuthenticate to a component prop
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
