// Routes and Layout
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux'; // Provider connects react <-> redux
import store from './store'; // bring in redux store

import './App.css';

const App = () => {
  // useEffect to run loadUser
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    // wrap everything in Provider to enable components with access to app-lv-state
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Home} />

          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
