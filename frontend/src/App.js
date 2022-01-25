import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './pages/About.js';
import SignUp from './pages/Signup.js';
import InstitutionsList from './pages/InstitutionsList.js';
  
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={About} />
        <Route path='/about' component={About} />
        <Route path='/institutions' component={InstitutionsList} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </Router>
  );
}
  
export default App;