import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store'
import { BrowserRouter as Router } from 'react-router-dom';

const rootEl = document.getElementById('root')

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    rootEl
  );
}

if (module.hot) {
  module.hot.accept('./App.js', function () {
    setTimeout(render);
  })
}
render()
reportWebVitals();
