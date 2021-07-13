import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const useAuth = (props) => {
  const { currentUser } = props;
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/signin");
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return currentUser;
};
const mapStateToProps = (state) => ({
  currentUser: state.auth.isSignedIn,
});
export default connect(mapStateToProps, null)(useAuth);
