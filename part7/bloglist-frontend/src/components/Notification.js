const Notification = ({ message }) => {
  if (message === null) return null;

  const style = {
    background: '#ccc',
    padding: '0.5em',
    border: '2px solid #000',
    borderRadius: '4px',
  };

  return <p style={style}>{message}</p>;
};

export default Notification;
