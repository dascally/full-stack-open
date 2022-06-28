import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { set3sNotification } from './reducers/notificationSlice';
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPosts,
  likeBlogPost,
} from './reducers/blogSlice';

import Blog from './components/Blog';
import NewPostForm from './components/NewPostForm';
import Toggleable from './components/Toggleable';

const Blogs = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);
  const [createPostIsVisible, setCreatePostIsVisible] = useState(false);

  const showNotification = (message) => {
    dispatch(set3sNotification(message));
  };

  useEffect(() => {
    dispatch(getBlogPosts());
  }, [dispatch]);

  const createPost = async ({ title, author, url }) => {
    dispatch(createBlogPost({ title, author, url, user }))
      .unwrap()
      .then((result) => {
        showNotification(`New blog post, ${title}, by ${author}, created.`);
        setCreatePostIsVisible(false);
      })
      .catch((err) => {
        showNotification(`Error creating new blog post: ${err.message}`);
        console.error('Error creating new post:', err.message);
      });
  };

  const likePost = async (blog) => {
    dispatch(likeBlogPost(blog))
      .unwrap()
      .then((result) => {
        showNotification(`Liked the blog post "${blog.title}".`);
      })
      .catch((err) => {
        showNotification(`Error liking blog post: ${err.message}`);
        console.error('Error liking post:', err.message);
      });
  };

  const removePost = async (blog) => {
    const confirmed = window.confirm(
      `Remove the blog "${blog.title}" by ${blog.author}?`
    );
    if (!confirmed) return;

    dispatch(deleteBlogPost(blog.id))
      .unwrap()
      .then((result) => {
        showNotification(`Deleted the blog post "${blog.title}".`);
      })
      .catch((err) => {
        showNotification(`Error deleting blog post: ${err.message}`);
        console.error('Error deleting post:', err.message);
      });
  };

  return (
    <>
      <h2>Blogs</h2>
      <section>
        <h3>Blog list</h3>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likePost={likePost}
            removePost={removePost}
            currentUser={user.username}
          />
        ))}
        <Toggleable
          buttonLabel='Create new post'
          visible={createPostIsVisible}
          setVisible={setCreatePostIsVisible}
        >
          <h3>Create new post</h3>
          <NewPostForm createPost={createPost} />
        </Toggleable>
      </section>
    </>
  );
};

export default Blogs;
