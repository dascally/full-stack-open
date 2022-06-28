import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import NewPostForm from './NewPostForm';

test('calls event handler with correct data when user creates new post', async () => {
  const newPost = {
    title: 'A sample title',
    author: 'Test User',
    url: 'http://sample-url.net',
  };
  const createPost = jest.fn();
  render(<NewPostForm createPost={createPost} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /create new post/i }));

  await user.type(screen.getByLabelText(/title/i), newPost.title);
  await user.type(screen.getByLabelText(/author/i), newPost.author);
  await user.type(screen.getByLabelText(/URL/i), newPost.url);

  await user.click(screen.getByRole('button', { name: /create new post/i }));

  expect(createPost).toHaveBeenCalledWith(newPost);
});
