import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment } from './reducers/blogSlice';
import { Link } from '@mui/material';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const blogPost = useSelector((state) =>
    state.blog.find((blogPost) => blogPost.id === params.blogId)
  );

  const [newComment, setNewComment] = useState('');

  const handleAddCommentSubmit = (evt) => {
    evt.preventDefault();

    dispatch(addComment({ blogId: blogPost.id, comment: newComment }))
      .unwrap()
      .then(() => {
        setNewComment('');
      });
  };

  return (
    <>
      {!blogPost ? (
        <p>Blog post not found.</p>
      ) : (
        <>
          <h2>{`${blogPost.title} by ${blogPost.author}`}</h2>
          <p>
            <Link href={blogPost.url}>{blogPost.url}</Link>
            <br />
            {blogPost.likes} likes
            <br />
            Added by {blogPost.user.name}.
          </p>
          <h3>Comments</h3>
          <form onSubmit={handleAddCommentSubmit}>
            <input
              type='text'
              required
              name='new-comment'
              value={newComment}
              onChange={(evt) => {
                setNewComment(evt.target.value);
              }}
            />
            <button type='submit'>Add comment</button>
          </form>
          <ul>
            {blogPost.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default BlogDetails;
