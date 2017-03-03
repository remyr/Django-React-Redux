import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import * as actions from '../actions/users.actions'
import { connect } from 'react-redux'

import LoginForm from '../components/login-form.component'


class LoginContainer extends Component {

    handleSubmit = (credentials) => {
        this.props.login(credentials)
    };

    componentWillUnmount() {
        this.props.resetRegistrationMessages()
    }

    render(){
        let { registration } = this.props.user;
        return(
            <div className="container user-form">
                <div className="row">
                    {registration.completed && (
                        <div className="col-md-6 col-md-offset-3 flashbag-message flashbag-success">
                            <h6>Registration completed, Welcome {registration.username}</h6>
                        </div>
                    )}
                </div>
                <div className="row">
                    <div className="panel panel-default panel-form col-md-6 col-md-offset-3" id="login-form">
                        <div className="col-md-12 text-center">
                            <h1 className="form">Sign in</h1>
                        </div>
                        <LoginForm router={this.props.router} errors={this.props.user.errors} onSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: bindActionCreators(actions.login, dispatch),
        resetRegistrationMessages: bindActionCreators(actions.resetRegistrationMessages, dispatch),
    }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
