import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/users.actions'
import { browserHistory } from 'react-router'

import RegisterForm from '../components/register-form.component'


class RegisterContainer extends Component {

    handleSubmit = (credentials) => {
        this.props.register(credentials);
    };

    render(){
        return(
           <div className="container user-form">
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
        register: bindActionCreators(actions.register, dispatch),
        push: (path) => browserHistory.push(path),
    }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
