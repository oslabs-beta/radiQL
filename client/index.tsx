import * as React from 'react';
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from './React/App';
import "./styles/tailwind.css";
import "./styles/aboutPage.scss";
import "./styles/codeBlock.scss";
import "./styles/loginModal.scss";
import "./styles/mainPage.scss";
import "./styles/mountainLogo.scss";
import "./styles/navBar.scss";

ReactDOM.render(<HashRouter> <App/> </HashRouter>, document.querySelector('#root'));
