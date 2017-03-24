import { actions } from '../actions/users.actions'

const INITIAL_STATE = {isAuth: false, errors: null, loading: false, user: {}, registration: {} };

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
        case actions.RESET_REGISTRATION_MESSAGES:
            return {...state, registration: {} };
        case actions.REGISTER_SUCCESS:
            return {...state, registration: {completed: true, username: action.payload} };
        default:
            return state
    }

}
