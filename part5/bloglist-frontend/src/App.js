import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import * as blogService from './services/blogs';
import * as loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createNoteIsVisible, setCreateNoteIsVisible] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
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
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const handleCreatePostSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const newBlog = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      });

      setBlogs([...blogs, newBlog]);
      showNotification(
        `New blog post, ${blogTitle}, by ${blogAuthor}, created.`
      );

      setCreateNoteIsVisible(false);
      setBlogAuthor('');
      setBlogTitle('');
      setBlogUrl('');
    } catch (err) {
      console.error('Error creating new post:', err.message);
      showNotification(`Error creating new blog post: ${err.message}`);
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
          <h3>Blog list</h3>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <Toggleable
            buttonLabel='Create new post'
            visible={createNoteIsVisible}
            setVisible={setCreateNoteIsVisible}
          >
            <h3>Create new post</h3>
            <form onSubmit={handleCreatePostSubmit}>
              <div>
                <label htmlFor='title'>
                  Title{' '}
                  <input
                    name='title'
                    type='text'
                    value={blogTitle}
                    onChange={(evt) => {
                      setBlogTitle(evt.target.value);
                    }}
                  />
                </label>
              </div>
              <div>
                <label htmlFor='author'>
                  Author{' '}
                  <input
                    name='author'
                    type='text'
                    value={blogAuthor}
                    onChange={(evt) => {
                      setBlogAuthor(evt.target.value);
                    }}
                  />
                </label>
              </div>
              <div>
                <label htmlFor='url'>
                  URL{' '}
                  <input
                    name='url'
                    type='url'
                    value={blogUrl}
                    onChange={(evt) => {
                      setBlogUrl(evt.target.value);
                    }}
                  />
                </label>
              </div>
              <div>
                <button type='submit'>Create new post</button>
              </div>
            </form>
          </Toggleable>
        </>
      )}
    </>
  );
};

export default App;
