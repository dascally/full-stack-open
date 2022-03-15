const Filter = ({ value, onChange }) => {
  return (
    <p>
      Filter shown with{' '}
      <input type='search' value={value} onChange={onChange} />
    </p>
  );
};

export default Filter;
