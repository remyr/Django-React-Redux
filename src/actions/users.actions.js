import { browserHistory } from 'react-router'
import axios from 'axios'
import {reset} from 'redux-form';
import {SubmissionError} from "redux-form";

import config from '../config'
import {focus} from "redux-form";
import {blur} from "redux-form";
import {untouch} from "redux-form";

export const actions = {
	LOGIN_USER_START: 'LOGIN_USER_START',
	LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
	LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
	LOGOUT_USER: 'LOGOUT_USER',
	RESET_ERRORS: 'RESET_ERRORS'
};

class UserFunctions {

	static loginStart() {
		return {
			type: actions.LOGIN_USER_START
		}
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

	static resetErrors() {
		return { type: actions.RESET_ERRORS }
	}
}


export function login(credentials) {
	return (dispatch) => {

		dispatch(UserFunctions.loginStart());

		let request = axios.post(`${config.apiUrl}/token`, credentials)
			.then(response => response.data)
			.then(data => {
				dispatch(UserFunctions.loginSuccess(data.user));
				browserHistory.push('/')
			})
			.catch(errors => {
				let {data} = errors.response;
				dispatch(UserFunctions.loginFailure(data['non_field_errors'][0]));
			});

		request.then(() => {
			dispatch(reset('login'));
		})
	}
}

export function resetErrors() {
	return (dispatch) => {
		dispatch(UserFunctions.resetErrors())
	}
}

export function logout() {
	return (dispatch) => {
		dispatch(UserFunctions.logout());
		browserHistory.push('/login')
	}
}

/*export function loginUserSuccess(data) {
 window.localStorage.setItem('token', data.token);
 window.localStorage.setItem('user', data.user);
 return (dispatch) => {
 dispatch({type: SIGN_IN_USER_SUCCESS, payload: data.user});
 }
 }

 export function logoutUser() {
 window.localStorage.removeItem('token');
 window.localStorage.removeItem('user');
 return (dispatch) => {
 dispatch({type: SIGN_OUT_USER});
 browserHistory.push('/login')
 }
 }*/


