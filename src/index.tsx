import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import App from './App';
import MainPage from './components/MainPage/MainPage'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MainPage />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
