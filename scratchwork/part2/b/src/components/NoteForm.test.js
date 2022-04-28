import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import NoteForm from './NoteForm';

test('updates parent state and calls onSubmit', async () => {
  const createNote = jest.fn();
  const user = userEvent.setup();

  render(<NoteForm createNote={createNote} />);

  // const input = screen.getByRole('textbox');
  const input = screen.getByPlaceholderText('Write note content here!');
  const sendButton = screen.getByText('Save');

  await user.type(input, 'testing a form...');
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...');
});
