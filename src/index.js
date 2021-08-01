import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

/*
  How To: build for production and test locally

  npm run build

  The above will create a 'build' folder at the root of the project
  This 'build' folder is all you need to deploy to production

  May need to install local (simple) HTML server (only once) globally
  Note: must prepend 'sudo' on Mac for super-user permissions

  sudo npm install -g serve
  [enter password]

  Then you can run the production build locally

  serve -s build -p 8000

  Now this app is running, on http://localhost:8000

*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
