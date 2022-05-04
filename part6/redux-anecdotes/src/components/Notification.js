// import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  // const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return !notification ? null : <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => ({ notification: state.notification });

export default connect(mapStateToProps)(Notification);
