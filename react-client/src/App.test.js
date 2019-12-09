import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Authentication } from './Authentication';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Authentication><App /></Authentication>, div);
  ReactDOM.unmountComponentAtNode(div);
});
