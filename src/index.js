import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Routes';
import { Provider } from 'react-redux'
import store, { persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import 'react-upload-gallery/dist/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
