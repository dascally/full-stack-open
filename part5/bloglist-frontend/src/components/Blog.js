import { useState } from 'react';

const Blog = ({ blog, likePost }) => {
  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    border: 'solid 1px black',
    marginBottom: '0.25em',
    padding: '0.1em 0.25em',
  };
  const blogDetailsStyle = {
    display: expanded ? null : 'none',
  };

  const handleToggleClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = async (evt) => {
    evt.target.disabled = true;
    await likePost(blog);
    evt.target.disabled = false;
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, by {blog.author}{' '}
        <button type='button' onClick={handleToggleClick}>
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>
      <div style={blogDetailsStyle}>
        URL: {blog.url}
        <br />
        Likes: {blog.likes}{' '}
        <button type='button' onClick={handleLikeClick}>
          Like
        </button>
        <br />
        User: {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
