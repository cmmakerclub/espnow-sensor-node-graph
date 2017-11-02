import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import paho from 'paho-mqtt/mqttws31'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
