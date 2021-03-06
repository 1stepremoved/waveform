import { connect } from 'react-redux';
import MainNav from './main_nav';
import { logOut } from '../../actions/session_actions';
import { requestTracksForSearch } from '../../actions/track_actions';
import { changeForm, clearSearchTracks, resetSearch } from '../../actions/ui_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    isRoot: ownProps.location.pathname === "/",
    searchTrackIds: state.ui.searchTrackIds,
    resetSearchValue: state.ui.resetSearch
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    changeForm: (formName) => dispatch(changeForm(formName)),
    requestTracksForSearch: (num, offset, query) => dispatch(requestTracksForSearch(num, offset, query)),
    clearSearchTracks: () => dispatch(clearSearchTracks()),
    resetSearch: (value) => dispatch(resetSearch(value))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNav));
