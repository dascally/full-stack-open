import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set3sNotification } from './reducers/notificationSlice';
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPosts,
  likeBlogPost,
} from './reducers/blogSlice';
import { login, setUser } from './reducers/userSlice';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import NewPostForm from './components/NewPostForm';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createPostIsVisible, setCreatePostIsVisible] = useState(false);

  const notification = useSelector((state) => state.notification);
  const showNotification = (message) => {
    dispatch(set3sNotification(message));
  };

  useEffect(() => {
    dispatch(getBlogPosts());
  }, [dispatch]);

  useEffect(() => {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();

    dispatch(login({ username, password }))
      .unwrap()
      .then((user) => {
        setUsername('');
        setPassword('');

        localStorage.setItem('user', JSON.stringify(user));

        showNotification(`User ${user.name} logged in.`);
      })
      .catch((err) => {
        console.error('Invalid credentials:', err.message);
        showNotification(`Invalid credentials: ${err.message}`);
      });
  };

  const handleLogoutClick = (evt) => {
    showNotification(`User ${user.name} logged out.`);
    dispatch(setUser(null));
    localStorage.removeItem('user');
  };

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
      {user === null ? (
        <>
          <h2>Log in</h2>
          <Notification message={notification} />
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor='username'>Username</label>
              <input
                id='username'
                type='text'
                name='username'
                required
                value={username}
                onChange={(evt) => {
                  setUsername(evt.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                name='password'
                required
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
            </div>
            <div>
              <button type='submit'>Login</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>Blogs</h2>
          <Notification message={notification} />
          <p>
            {user.name} is logged in.{' '}
            <button type='button' onClick={handleLogoutClick}>
              Logout
            </button>
          </p>
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
      )}
    </>
  );
};

export default App;
