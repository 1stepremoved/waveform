import { connect } from 'react-redux';
import SplashIndexItem from './splash_index_item';
import { addToQueueNow } from '../../actions/queue_actions';


const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToQueueNow: (id) => dispatch(addToQueueNow(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashIndexItem);
