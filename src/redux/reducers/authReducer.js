const initalState = {
  isSignedIn: false,
  userId: null,
  role: null,
  authError: null,
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case "AUTH_ERROR":
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        role: null,
        authError: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.uid,
        role: action.payload.role,
        authError: null,
      };
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.uid,
        role: action.payload.role,
        authError: null,
      };
    case "SIGN_UP":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.uid,
        role: action.payload.role,
        authError: null,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        role: null,
        authError: null,
      };
    default:
      return state;
  }
};

export default authReducer;
