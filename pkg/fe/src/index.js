import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AdminApp from './AdminApp';
import WelcomeApp from './WelcomeApp';
import NotFoundApp from './NotFoundApp';

const render = App => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

const selector = window.location.pathname;
if (!selector || selector === '/'){
  render(WelcomeApp);
} else if (selector.includes('admin')){
  render(AdminApp);
} else {
  render(NotFoundApp);
}
