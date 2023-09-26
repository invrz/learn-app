import {Fragment} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import Home from "./routes/home/main";

const App = () => {
  return(
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
    </Fragment>
  )
}

export default App;