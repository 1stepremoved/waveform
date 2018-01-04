import { connect } from 'react-redux';
import UserNav from './user_nav';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

export default connect(mapStateToProps,null)(UserNav);
