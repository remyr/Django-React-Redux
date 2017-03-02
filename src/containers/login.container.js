import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import * as actions from '../actions/users.actions'
import { connect } from 'react-redux'

import LoginForm from '../components/login-form.component'


class LoginContainer extends Component {

    componentDidMount() {
        this.props.resetErrors();
    }

    handleSubmit = (credentials) => {
        this.props.login(credentials)
    };

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3" id="login-form">
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
        resetErrors: bindActionCreators(actions.resetErrors, dispatch),
    }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
