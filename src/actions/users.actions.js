import { browserHistory } from 'react-router'
import axios from 'axios'
import {reset, stopSubmit} from 'redux-form';

import config from '../config'

export const actions = {
    LOGIN_USER_START: 'LOGIN_USER_START',
    LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
    LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
    LOGOUT_USER: 'LOGOUT_USER',
    RESET_REGISTRATION_MESSAGES: 'RESET_REGISTRATION_MESSAGES',
    REGISTER_START: 'REGISTER_START',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE'
};

const _loginStart = () => ({ type: actions.LOGIN_USER_START });

export const loginSuccess = (user) => ({ type: actions.LOGIN_USER_SUCCESS, payload: user });

const _loginFailure = (errors) => ({ type: actions.LOGIN_USER_FAILURE, payload: errors });

const _logout = () => ({ type: actions.LOGOUT_USER });

const _resetRegistrationMessages = () => ({ type: actions.RESET_REGISTRATION_MESSAGES });

const _registerStart = () => ({ type: actions.REGISTER_START });

const _registerSuccess = (username) => ({ type: actions.REGISTER_SUCCESS, payload: username });

const _registerFailure = () => ({ type: actions.REGISTER_FAILURE });


export function formatFormErrors(errors) {
    let formError = {};
    Object.keys(errors).forEach(error => {
        errors[error].forEach(message => {
            if (formError[error]) {
                formError[error] += `, ${message}`
            } else {
                formError[error] = message
            }
        })
    });
    return formError
}

export function login(credentials) {
    return (dispatch) => {

        dispatch(_loginStart());
        axios.post(`${config.apiUrl}/token`, credentials)
            .then(response => response.data)
            .then(data => {
                dispatch(loginSuccess(data.user));
                localStorage.setItem('token', data.token);
                browserHistory.push('/');
                dispatch(reset('login'));
            })
            .catch(errors => {
                let {data} = errors.response;
                dispatch(_loginFailure(data));
                dispatch(stopSubmit('login', formatFormErrors(data)))
            });
    }
}

export function register(credentials) {
    return (dispatch) => {

        if (credentials.password !== credentials.confirmPassword) {
            dispatch(stopSubmit('register', {confirmPassword: 'Confirm passwords must be identical to password'}));
            return;
        }

        dispatch(_registerStart());
        axios.post(`${config.apiUrl}/register`, credentials)
            .then(response => {
                dispatch(_registerSuccess(response.data.username));
                dispatch(reset('register'));
                browserHistory.push('/login')
            })
            .catch(errors => {
                dispatch(_registerFailure());
                dispatch(stopSubmit('register', formatFormErrors(errors.response.data)))
            });
    }
}

export function resetRegistrationMessages() {
    return (dispatch) => {
        dispatch(_resetRegistrationMessages())
    }
}

export function logout() {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch(_logout());
        browserHistory.push('/login')
    }
}


