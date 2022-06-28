import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getBlogPosts } from './reducers/blogSlice';

import { Route, Routes } from 'react-router-dom';
import BlogsSummary from './BlogsSummary';
import BlogDetails from './BlogDetails';

const Blogs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogPosts());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<BlogsSummary />} />
      <Route path=':blogId' element={<BlogDetails />} />
    </Routes>
  );
};

export default Blogs;
