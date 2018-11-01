import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import App from './App';
import MainPage from './components/MainPage/MainPage'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AuthPage from './components/AuthPage/AuthPage';
import InputContainer from './components/AuthPage/InputContainer';

ReactDOM.render(
  <InputContainer/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
