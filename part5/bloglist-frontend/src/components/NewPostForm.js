import { useState } from 'react';

const NewPostForm = ({ createPost }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreatePostSubmit = async (evt) => {
    evt.preventDefault();

    await createPost({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleCreatePostSubmit}>
      <div>
        <label htmlFor='title'>
          Title{' '}
          <input
            name='title'
            type='text'
            value={title}
            onChange={(evt) => {
              setTitle(evt.target.value);
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
            value={author}
            onChange={(evt) => {
              setAuthor(evt.target.value);
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
            value={url}
            onChange={(evt) => {
              setUrl(evt.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <button type='submit'>Create new post</button>
      </div>
    </form>
  );
};

export default NewPostForm;
