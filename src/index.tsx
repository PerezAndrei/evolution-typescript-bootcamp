import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { HexagonGrid } from './Components/HexagonGrid';
import './Helpers/Extensions.ts'
import { HexagonGame } from './Components/HerxagonGame';

ReactDOM.render(
  <React.StrictMode>
    <HexagonGame/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
