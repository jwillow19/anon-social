import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const RenderPost = ({ auth, post }) => {
  const {
    _id,
    user,
    name,
    postContent,
    likes,
    dislikes,
    comments,
    date
  } = post;

  return (
    <div className='contentWrapper'>
      <div className='content'>
        <div>
          <p className='postContent'> {postContent} </p>
        </div>

        <p>{name}</p>
        <p className='postCreated'> {date} </p>
        <button type='button' className='btn btn-light'>
          <i className='fas fa-thumbs-up'></i>
          <span>{likes.length}</span>
        </button>
        <button type='button' className='btn btn-light'>
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to='/' className='btn btn-primary'>
          Comments <span className='comment-count'>{comments.length}</span>
        </Link>
        {/* if not loading, and authenticated user == post user, then can delete */}
        {!auth.loading && auth.user._id === user && (
          <button type='button' className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

RenderPost.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

// need auth state to grant remove-post access
const mapSateToProps = state => ({
  auth: state.auth
});

export default connect(mapSateToProps)(RenderPost);
