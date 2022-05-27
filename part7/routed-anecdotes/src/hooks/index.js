import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const props = {
    type,
    value,
    onChange,
  };

  const reset = () => {
    setValue('');
  };

  return { props, reset };
};
