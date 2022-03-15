const NewEntryForm = ({
  onSubmit,
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          name: <input type='text' value={newName} onChange={onNameChange} />
        </label>
      </div>
      <div>
        <label>
          number:{' '}
          <input type='tel' value={newNumber} onChange={onNumberChange} />
        </label>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default NewEntryForm;
