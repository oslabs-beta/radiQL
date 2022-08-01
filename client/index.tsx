import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles.css";
import "./styles.scss";

var mountNode = document.getElementById("root");
ReactDOM.render(<App name="Jane" />, mountNode);
