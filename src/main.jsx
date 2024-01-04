import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import { Provider } from 'react-redux';
import { store } from './store'


axios.defaults.baseURL="http://localhost:8000"
// axios.defaults.baseURL="https://movieticket-booking.onrender.com"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
