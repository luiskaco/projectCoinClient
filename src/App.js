import React, {Fragment} from 'react';

import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";

//componente
import Login from './components/auth/login'
import NewRegister from './components/auth/new-register';
import Principal from './components/content/principal';

function App() {
  return (
    <Fragment>
        
        <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/nueva" element={<NewRegister />} />
              <Route exact path="/principal" element={<Principal />} />
        
          </Routes>
        </Router>
   
    </Fragment>
  );
}

export default App;
