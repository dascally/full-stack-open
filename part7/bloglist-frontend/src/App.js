import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { set3sNotification } from './reducers/notificationSlice';
import { login, setUser } from './reducers/userSlice';

import { Link, Outlet } from 'react-router-dom';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const notification = useSelector((state) => state.notification);
  const showNotification = (message) => {
    dispatch(set3sNotification(message));
  };

  useEffect(() => {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const handleLoginSubmit = (evt) => {
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

  return (
    <>
      <nav
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '1rem',
          background: '#ddd',
        }}
      >
        <Link to='/blogs'>Blogs</Link>
        <Link to='/users'>Users</Link>
        {user ? (
          <p style={{ margin: '0' }}>
            {user.name} is logged in.{' '}
            <button type='button' onClick={handleLogoutClick}>
              Logout
            </button>
          </p>
        ) : null}
      </nav>
      <Notification message={notification} />
      {user === null ? (
        <>
          <h2>Log in</h2>
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
          <Outlet />
        </>
      )}
    </>
  );
};

export default App;
