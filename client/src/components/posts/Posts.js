import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// [*] Connect Register component to Redux 'setAlert action'
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { loadUser } from '../../actions/auth';
import RenderPost from './RenderPost';
import SubmitPost from './SubmitPost';
import './post.styles.scss';

const Posts = ({ getPosts, post }) => {
  const { posts } = post;

  // useEffect - React Hook it tells React that your component needs to do something after render. Here the effect is the getPost action, which fetch posts from api to state
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <SubmitPost />
      {/* Render individual post */}
      <div className='heading-primary-sub'>
        <h1 className='feed-title'>Oh boy, here we go</h1>

        {posts.map((post) => (
          <RenderPost key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
