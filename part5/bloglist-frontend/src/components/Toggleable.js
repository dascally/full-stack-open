const Toggleable = ({ buttonLabel, visible, setVisible, children }) => {
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const handleShowClick = () => {
    setVisible(true);
  };
  const handleHideClick = () => {
    setVisible(false);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleShowClick}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={handleHideClick}>Cancel</button>
      </div>
    </div>
  );
};

export default Toggleable;
