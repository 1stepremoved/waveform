import { connect }  from 'react-redux';
import Splash from './splash';
import { changeForm } from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    isRoot: ownProps.location.pathname === "/"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeForm: (formName) => dispatch(changeForm(formName))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Splash);
