import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AboutApp from './AboutApp';
import AdminApp from './AdminApp';
import NotFoundApp from './NotFoundApp';

const render = App => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

const selector = window.location.pathname;
if (selector === '/about'){
  render(AboutApp);
} else if (selector === '/admin'){
  render(AdminApp);
} else {
  render(NotFoundApp);
}
