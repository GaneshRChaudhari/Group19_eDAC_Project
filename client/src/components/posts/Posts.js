import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    
    return loading ? <Spinner /> : 
        <Fragment>
            <div className="posts_align">
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the IT community
            </p>
            <PostForm></PostForm>
            <div className="posts">
                {posts.map((post) =>(
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
            </div>
        </Fragment>;
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const  mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
