import React from 'react'
import { browserHistory } from 'react-router'
import {bindActionCreators} from "redux";
import * as actions from "../actions/users.actions";
import {connect} from "react-redux";
import {parseJwt} from "../utils/utils";

class AuthContainer extends React.Component {

    componentDidMount() {
        let token = localStorage.getItem('token');
        if(!token) {
            browserHistory.push('/login')
        } else {
            console.log(parseJwt(token));
            this.props.setUser(parseJwt(token))
        }
    }

    render(){
        return(this.props.children)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: bindActionCreators(actions.loginSuccess, dispatch),
    }
};

export default connect(null, mapDispatchToProps)(AuthContainer)
