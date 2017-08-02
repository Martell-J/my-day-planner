// Following Start Up Guide
// SEE: https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';

injectTapEventPlugin();
ReactDOM.render(
  <MuiThemeProvider>
    <Routes/>
  </MuiThemeProvider>,
  document.getElementById('root')
);
