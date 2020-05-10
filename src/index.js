import './web.config';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './components/common/Spinner.css';
import './components/common/ToggleSwitch.css';

import App from './components/App';
import { setApiInterceptors } from './components/apiClient';
import configureStore from './components/redux/configureStore';

const store = configureStore();
setApiInterceptors();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app'),
);
