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

class UserFunctions {

    static loginStart() {
        return { type: actions.LOGIN_USER_START }
    }

    static loginSuccess(user) {
        return {
            type: actions.LOGIN_USER_SUCCESS,
            payload: user
        }
    }

    static loginFailure(errors) {
        return {
            type: actions.LOGIN_USER_FAILURE,
            payload: errors
        }
    }

    static logout() {
        return {
            type: actions.LOGOUT_USER
        }
    }

    static resetRegistrationMessages() {
        return { type: actions.RESET_REGISTRATION_MESSAGES }
    }

    static registerStart() {
        return { type: actions.REGISTER_START }
    }

    static registerSuccess(username) {
        return {
            type: actions.REGISTER_SUCCESS,
            payload: username
        }
    }

    static registerFailure() {
        return { type: actions.REGISTER_FAILURE }
    }
}

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

        dispatch(UserFunctions.loginStart());
        axios.post(`${config.apiUrl}/token`, credentials)
            .then(response => response.data)
            .then(data => {
                dispatch(UserFunctions.loginSuccess(data.user));
                browserHistory.push('/');
                dispatch(reset('login'));
            })
            .catch(errors => {
                let {data} = errors.response;
                dispatch(UserFunctions.loginFailure(data));
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

        dispatch(UserFunctions.registerStart());
        axios.post(`${config.apiUrl}/register`, credentials)
            .then(response => {
                dispatch(UserFunctions.registerSuccess(response.data.username));
                dispatch(reset('register'));
                browserHistory.push('/login')
            })
            .catch(errors => {
                dispatch(UserFunctions.registerFailure());
                dispatch(stopSubmit('register', formatFormErrors(errors.response.data)))
            });
    }
}

export function resetRegistrationMessages() {
    return (dispatch) => {
        dispatch(UserFunctions.resetRegistrationMessages())
    }
}

export function logout() {
    return (dispatch) => {
        dispatch(UserFunctions.logout());
        browserHistory.push('/login')
    }
}


