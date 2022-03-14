import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './bootstrap-config/customBootstrap.css';
import ContextMixin from './contexts';

ReactDOM.render(
  <ContextMixin>
    <App />
  </ContextMixin>,
  document.getElementById('root')
);
