/*
import { SIGN_IN_USER, SIGN_IN_USER_SUCCESS, SIGN_OUT_USER } from '../actions/users.actions'

const INITIAL_STATE = {isAuth: false, error: null, loading: false, user: {} };

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case SIGN_IN_USER:
      return {...state, isAuth: false, error: null, loading: true};
    case SIGN_IN_USER_SUCCESS:
      return {...state, isAuth: true, error: null, loading: false, user: action.payload};
    case SIGN_OUT_USER:
      return {...state, user: null, isAuth: false, error: null, loading: false};
    default:
      return state
  }
}
*/

import { actions } from '../actions/users.actions'

const INITIAL_STATE = {isAuth: false, errors: null, loading: false, user: {} };

export default function (state = INITIAL_STATE, action) {

    switch(action.type) {
        case actions.LOGIN_USER_START:
            return {...state, loading: true};
        case actions.LOGIN_USER_SUCCESS:
            return {...state, isAuth: true, errors: null, loading: false, user: action.payload};
        case actions.LOGIN_USER_FAILURE:
            return {...state, isAuth: false, errors: action.payload, loading: false, user: {}};
        case actions.LOGOUT_USER:
            return {...state, isAuth: false, errors: null, loading: false, user: {}};
        case actions.RESET_ERRORS:
            return {...state, errors: null };
        default:
            return state
    }

}