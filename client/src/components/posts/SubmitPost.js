import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';

const SubmitPost = ({ createPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='container'>
      <div className='jumbotron centered'>
        <i className='fas fa-key fa-6x'></i>
        <h1 className='display-3'>Secrets</h1>
        <p className='secret-text'>
          Don't keep your secrets, share them anonymously!
        </p>

        <form
          onSubmit={e => {
            // do the following on submit
            e.preventDefault();
            // fill in the postContent field with text
            createPost({ postContent: text });
            // clear the form/state with
            setText('');
          }}
        >
          <div className='form-group'>
            <textarea
              name='secretContent'
              className='form-control'
              id='message'
              rows='11'
              cols='10'
              placeholder='Message'
              // set state value
              value={text}
              // call state-update function on change
              onChange={e => setText(e.target.value)}
            ></textarea>
          </div>
          <button type='submit' className='btn btn-dark'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

SubmitPost.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(SubmitPost);
