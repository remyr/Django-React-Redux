import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App'
import LoginContainer from './containers/login.container'
import RegisterContainer from './containers/register.container'
import IndexContainer from './containers/index.container'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={IndexContainer}/>
        <Route path="/login" component={LoginContainer}/>
        <Route path="/register" component={RegisterContainer}/>
    </Route>
)
