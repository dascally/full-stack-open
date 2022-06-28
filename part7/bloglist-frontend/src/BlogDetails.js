import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const params = useParams();
  const blogPost = useSelector((state) =>
    state.blog.find((blogPost) => blogPost.id === params.blogId)
  );

  return (
    <>
      {!blogPost ? (
        <p>Blog post not found.</p>
      ) : (
        <>
          <h2>{`${blogPost.title} by ${blogPost.author}`}</h2>
          <p>
            <a href={blogPost.url}>{blogPost.url}</a>
            <br />
            {blogPost.likes} likes
            <br />
            Added by {blogPost.user.name}.
          </p>
        </>
      )}
    </>
  );
};

export default BlogDetails;
