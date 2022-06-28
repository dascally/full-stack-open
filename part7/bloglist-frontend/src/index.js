import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Blogs from './Blogs';
import Users from './Users';
import UsersSummary from './UsersSummary';
import User from './User';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Blogs />} />
          <Route path='/blogs/*' element={<Blogs />} />
          <Route path='/users' element={<Users />}>
            <Route index element={<UsersSummary />} />
            <Route path=':userId' element={<User />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
