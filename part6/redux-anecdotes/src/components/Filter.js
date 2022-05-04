import { connect /*useDispatch*/ } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = ({ setFilter }) => {
  // const dispatch = useDispatch();

  const handleChange = (evt) => {
    // dispatch(setFilter(evt.target.value));
    setFilter(evt.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { setFilter })(Filter);
