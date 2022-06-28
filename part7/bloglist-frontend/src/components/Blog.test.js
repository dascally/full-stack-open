import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Blog from './Blog';

const user = { username: 'Ebidaj', name: 'Ebidaj Paleu' };
const blog = {
  title: 'A sample blog post',
  author: 'Ebidaj',
  url: 'http://www.url.net',
  likes: 15,
  user,
};

function renderBlog() {
  const likePost = jest.fn();
  const removePost = jest.fn();

  const renderResult = render(
    <Blog
      blog={blog}
      likePost={likePost}
      removePost={removePost}
      currentUser={user.username}
    />
  );

  return { ...renderResult, likePost, removePost };
}

test("renders blog's title and author but not URL or likes by default", () => {
  renderBlog();

  expect(screen.getByText(`${blog.title}`, { exact: false })).toBeVisible();
  expect(screen.getByText(`by ${blog.author}`, { exact: false })).toBeVisible();

  expect(screen.getByText(/URL:/i)).not.toBeVisible();
  expect(screen.getByText(/Likes:/i)).not.toBeVisible();
});

test('renders the URL and likes after the show button is clicked', async () => {
  renderBlog();
  const user = userEvent.setup();

  const showBtn = screen.getByRole('button', { name: /Show/i });
  await user.click(showBtn);

  expect(screen.getByText(`URL: ${blog.url}`, { exact: false })).toBeVisible();
  expect(
    screen.getByText(`Likes: ${blog.likes}`, { exact: false })
  ).toBeVisible();
});

test('calls like event handler each time like button is clicked', async () => {
  const { likePost } = renderBlog();
  const user = userEvent.setup();

  const showBtn = screen.getByRole('button', { name: /Show/i });
  await user.click(showBtn);

  const likeBtn = screen.getByRole('button', { name: /Like/i });
  expect(likePost).not.toHaveBeenCalled();
  await user.click(likeBtn);
  expect(likePost).toHaveBeenCalledTimes(1);
  await user.click(likeBtn);
  expect(likePost).toHaveBeenCalledTimes(2);
});
