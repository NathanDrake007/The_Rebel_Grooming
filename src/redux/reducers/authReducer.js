const initalState = {
  isSignedIn: false,
  userId: null,
  authError: null,
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case "AUTH_ERROR":
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        authError: action.payload,
      };
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload,
        authError: null,
      };
    case "SIGN_UP":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload,
        authError: null,
      };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null, authError: null };
    default:
      return state;
  }
};

export default authReducer;
