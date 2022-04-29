import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from './Blog';

test("renders blog's title and author but not URL or likes by default", () => {
  const user = { username: 'Ebidaj', name: 'Ebidaj Paleu' };
  const blog = {
    title: 'A sample blog post',
    author: 'Ebidaj',
    url: 'http://www.url.net',
    likes: 15,
    user,
  };
  const likePost = jest.fn();
  const removePost = jest.fn();

  render(
    <Blog
      blog={blog}
      likePost={likePost}
      removePost={removePost}
      currentUser={user.username}
    />
  );

  expect(screen.getByText(`${blog.title}`, { exact: false })).toBeVisible();
  expect(screen.getByText(`by ${blog.author}`, { exact: false })).toBeVisible();

  expect(screen.getByText(/URL:/i)).not.toBeVisible();
  expect(screen.getByText(/Likes:/i)).not.toBeVisible();
});
