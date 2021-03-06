import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Provider} from 'react-redux'
import store from './store/store'


function App() {
  return (
    <Provider store = {store}>
      <Navbar />
    </Provider>
  );
}

export default App;
