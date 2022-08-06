import * as React from 'react';
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from './React/App';
import "./styles.css";
import "./styles.scss";

ReactDOM.render(<HashRouter> <App/> </HashRouter>, document.querySelector('#root'));
