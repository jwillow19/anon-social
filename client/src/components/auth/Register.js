import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// [*] Connect Register component to Redux 'setAlert action'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

// Axisos - promise based HTTP client for the browser and node.js
// async await
// import axios from 'axios';

export const Register = props => {
  // [*]  Declaring form state and function to be used for state update
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // destructure formData for convenience
  const { name, email, password, password2 } = formData;
  // [*]  declare onChange function to update state
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // [*] create onSubmit function
  //  frontend - verify client credientials: matching password
  //  backend - use Axios to make POST request to /api/user for register
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      await props.setAlert('unmatch', 'bad');
    } else {
      // [*] An example of how to create newUser and store data to DB
      //    By convention it is better to do this with redux
      // const newUser = {
      //   name,
      //   email,
      //   password
      // };
      // try {
      //   // set header, json body content
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   };
      //   const body = JSON.stringify(newUser);
      //   // send post request to /api/user to register
      //   // const res = await axios({
      //   //   method: 'post',
      //   //   url: '/api/users',
      //   //   data: body,
      //   //   config
      //   // });
      //   const res = await axios.post(
      //     'http://localhost:5000/api/users',
      //     body,
      //     config
      //   );
      //   console.log(res.data);
      // } catch (exception) {
      //   console.error(exception.response.data);
      // }
    }
  };

  return (
    <Fragment>
      <div className='container mt-5'>
        <h1>Sign Up</h1>

        <div className='row'>
          <div className='col-sm-8'>
            <div className='card'>
              <div className='card-body'>
                <form onSubmit={e => onSubmit(e)}>
                  <h3>Choose your username</h3>
                  <p>
                    Your username is how other members will see you. This name
                    will be used to credit the things you share. What is your
                    username?
                  </p>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      name='name'
                      // set value to associate with {name} variable
                      value={name}
                      // update input value by calling JS onChange function
                      onChange={e => onChange(e)}
                      required
                      placeholder='Choose a username'
                    />
                  </div>
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

                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control'
                      name='password2'
                      // set value to associate with {name} variable
                      value={password2}
                      // update input value by calling JS onChange function
                      onChange={e => onChange(e)}
                      required
                      placeholder='Confirm password'
                    />
                  </div>

                  <button type='submit' className='btn btn-dark'>
                    Register
                  </button>
                </form>
                <p>
                  Already have an account?
                  <Link to='/login' className='btn btn-sm' role='button'>
                    LOGIN
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

// connect(state, obj with action )
export default connect(null, { setAlert })(Register);
