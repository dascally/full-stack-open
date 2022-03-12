const Notification = ({ message, messageType }) => {
  return <p className={`${messageType}Message`}>{message}</p>;
};

export default Notification;
