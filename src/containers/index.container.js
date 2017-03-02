import React, { Component } from 'react'
import IndexComponent from '../components/Index.component'
import { browserHistory } from 'react-router'
import {connect} from "react-redux";
import { bindActionCreators } from "redux"
import { logout } from '../actions/users.actions'
import axios from 'axios'

const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

class AppContainer extends Component {

    /*componentWillMount() {
        let token = window.localStorage.getItem('token');
        let decoded_token = parseJwt(token);
        let expire_at = decoded_token.exp;
        if(!token) {
            browserHistory.push('/login')
        }
        console.log(decoded_token);
        delete decoded_token['exp'];
        this.props.setUser(decoded_token);
        /!*axios.post('api/v1/check-token', {token: token})
            .then(response => this.props.userActions.loginUserSuccess(response.data))
            .catch(errors => browserHistory.push('/login'))*!/
    }*/

    componentWillMount() {
        if (!this.props.userState.isAuth) {
            // browserHistory.push('/login')
        }
    }

    render(){
        return(
            <IndexComponent
                user={this.props.userState.user}
                logout={this.props.logout}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: bindActionCreators(logout, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        userState: state.user,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
