import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import NewPostForm from './components/NewPostForm';
import * as blogService from './services/blogs';
import * as loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createPostIsVisible, setCreatePostIsVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationTimerId, setNotificationTimerId] = useState(null);

  const showNotification = (message) => {
    clearTimeout(notificationTimerId);

    setNotification(message);

    const timerId = setTimeout(() => {
      setNotification(null);
      setNotificationTimerId(null);
    }, 3000);
    setNotificationTimerId(timerId);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const user = await loginService.login(username, password);

      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');

      localStorage.setItem('user', JSON.stringify(user));

      showNotification(`User ${user.name} logged in.`);
    } catch (err) {
      console.error('Invalid credentials:', err.message);
      showNotification(`Invalid credentials: ${err.message}`);
    }
  };

  const handleLogoutClick = (evt) => {
    showNotification(`User ${user.name} logged out.`);
    setUser(null);
    blogService.setToken(null);
    localStorage.removeItem('user');
  };

  const createPost = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.create({ title, author, url });

      setBlogs([...blogs, { ...newBlog, user }]);
      showNotification(`New blog post, ${title}, by ${author}, created.`);

      setCreatePostIsVisible(false);
    } catch (err) {
      console.error('Error creating new post:', err.message);
      showNotification(`Error creating new blog post: ${err.message}`);
    }
  };

  const likePost = async (blog) => {
    try {
      const likedBlog = await blogService.like(blog);
      const newBlogs = blogs.map((currentBlog) =>
        currentBlog.id === blog.id ? likedBlog : currentBlog
      );
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (err) {
      console.error('Error liking post:', err.message);
      showNotification(`Error liking blog post: ${err.message}`);
    }
  };

  const removePost = async (blog) => {
    try {
      const confirmed = window.confirm(
        `Remove the blog "${blog.title}" by ${blog.author}?`
      );
      if (!confirmed) return;

      await blogService.remove(blog.id);
      const newBlogs = blogs.filter(
        (currentBlog) => currentBlog.id !== blog.id
      );
      setBlogs(newBlogs);
    } catch (err) {
      console.error('Error deleting post:', err.message);
      showNotification(`Error deleting blog post: ${err.message}`);
    }
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
