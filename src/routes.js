import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App'
import LoginContainer from './containers/login.container'
import RegisterContainer from './containers/register.container'
import IndexContainer from './containers/index.container'
import AuthContainer from './containers/auth.container'

export default (
    <Route path="/" component={App}>
        <Route component={AuthContainer}>
            <IndexRoute component={IndexContainer}/>
        </Route>
        <Route path="/login" component={LoginContainer}/>
        <Route path="/register" component={RegisterContainer}/>
    </Route>
)
