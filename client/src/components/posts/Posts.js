import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// [*] Connect Register component to Redux 'setAlert action'
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { loadUser } from '../../actions/auth';

const Posts = ({ getPosts, post }) => {
  const { posts, loading } = post;

  // useEffect - React Hook it tells React that your component needs to do something after render. Here the effect is the getPost action, which fetch posts from api to state
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // [*] Component take post object and render post in a <div>
  function RenderPost(prop) {
    return (
      <div className='contentWrapper'>
        <div className='content'>
          <div className='postHeader'>
            <p>{prop.post.name}</p>
            <p className='postCreated'> {prop.post.date} </p>
          </div>

          <p className='postContent'> {prop.post.postContent} </p>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>

      {/* Post item - loop through each post from posts array and display */}
      <div className='posts'>
        Here we go
        {posts.map(post => (
          <RenderPost key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
