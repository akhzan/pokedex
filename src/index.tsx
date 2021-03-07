import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from 'App'
import store from 'store'
import AppRouter from 'router'
import reportWebVitals from 'reportWebVitals'
import 'assets/styles/index.less'
import 'assets/styles/override.css'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App>
        <AppRouter />
      </App>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
