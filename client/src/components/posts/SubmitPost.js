import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';
import './submit-post.styles.scss';

const SubmitPost = ({ createPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-header'>
      <div className='text-box'>
        <h1 className='heading-primary'>
          <span className='heading-primary'>Secrets Feed</span>
          <span
            className='heading-secondary
          '
          >
            What's on your mind?
          </span>
        </h1>
        <form
          onSubmit={(e) => {
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
              className='form-control paragraph'
              id='message'
              rows='5'
              placeholder='Message to share'
              // set state value
              value={text}
              // call state-update function on change
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <button type='submit' className='post-btn post-btn-dark'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

SubmitPost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(SubmitPost);
