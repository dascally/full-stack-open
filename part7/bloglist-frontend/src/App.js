import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { set3sNotification } from './reducers/notificationSlice';
import { login, setUser } from './reducers/userSlice';

import { Link, Outlet } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const handleShowPasswordClick = (evt) => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <CssBaseline />
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
            <Button
              type='button'
              variant='contained'
              sx={{ textTransform: 'initial' }}
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          </p>
        ) : null}
      </nav>
      <Notification message={notification} />
      {user === null ? (
        <>
          <h2>Log in</h2>
          <form onSubmit={handleLoginSubmit}>
            <div>
              <TextField
                label='Username'
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
              <TextField
                label='Password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                required
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Toggle password visibility'
                        onClick={handleShowPasswordClick}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <Button
                type='submit'
                variant='contained'
                sx={{ textTransform: 'initial' }}
              >
                Login
              </Button>
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
