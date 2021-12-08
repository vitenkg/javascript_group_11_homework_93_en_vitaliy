import {
  AVATAR_USER,
  LOGIN_USER_FAILURE, LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS, LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS
} from "../Actions/usersActions";

const initialState = {
  user: null,
  registerError: null,
  loginLoading: null,
  loginError: null,
  avatar: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {...state, user: action.payload, registerError: null};
    case REGISTER_USER_FAILURE:
      return {...state, registerError: action.payload};
    case LOGIN_USER_REQUEST:
      return {...state, loginLoading: true};
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.payload, loginError: null, loginLoading: false};
    case LOGIN_USER_FAILURE:
      return {...state, loginError: action.payload, loginLoading: false};
    case LOGOUT_USER:
      return {...state, user: null};
    case AVATAR_USER:
      console.log(action.payload);
      return {...state, avatar: action.payload};
    default:
      return state;
  }
};

export default usersReducer;