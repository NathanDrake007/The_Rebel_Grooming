import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

function AdminPage(props) {
  const history = useHistory();
  useEffect(() => {
    if (props.isSignedIn) {
      if (props.role !== "admin") {
        history.replace("/");
      }
    } else {
      history.replace("/signin");
    }
  }, [props.isSignedIn, props.role, history]);
  return <div>Welcome Admin</div>;
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    role: state.auth.role,
    uid: state.auth.userId,
  };
};
export default connect(mapStateToProps, null)(AdminPage);
