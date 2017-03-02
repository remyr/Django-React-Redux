import React from 'react'
import ReactDom from 'react-dom'
import { Router, browserHistory} from 'react-router'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import routes from './routes'

const store = configureStore();

require('./scss/main.scss');

ReactDom.render(
  <Provider store={store}>
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    </Provider>
, document.getElementById('app'));
