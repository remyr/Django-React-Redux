import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/users.actions'
import { SubmissionError } from 'redux-form'
import { browserHistory } from 'react-router'
import {reset} from 'redux-form';
import axios from 'axios'

import RegisterForm from '../components/register-form.component'


class RegisterContainer extends Component {

    handleSubmit = (credentials) => {
        if(credentials.password != credentials.confirmPassword) {
            throw new SubmissionError({confirmPassword: 'Confirm passwords must be identical to password' })
        }
        return axios.post('api/v1/register', credentials)
            .then(response => response.data)
            .then(data => {
                console.log('SUCCESS', data);
                this.props.resetForm('register');
                browserHistory.push('/login');
            })
            .catch(errors => {
                console.log(errors)
            })
    };

    render(){
        return(
           <div className="container">
                <div className="row">
                    <div className="panel panel-default panel-form col-md-6 col-md-offset-3" id="login-form">
                        <div className="col-md-12 text-center">
                            <h1 className="form">Sign up</h1>
                        </div>
                        <RegisterForm router={this.props.router} onSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetForm: (formName) => dispatch(reset(formName)),
        push: (path) => browserHistory.push(path),
    }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
