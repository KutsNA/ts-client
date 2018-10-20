import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import App from './App';
import MainPage from './components/MainPage/MainPage'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AuthPage from './components/AuthPage/AuthPage';
import ValidationForm from './components/AuthPage/ValidationForm';

ReactDOM.render(
  <AuthPage/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
