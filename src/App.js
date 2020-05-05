import React from 'react';
import { Route, Switch } from 'react-router-dom'; 
import MainPage from  './MainPage.js';
import Login from './Login.js';
import Register from './Register.js';
import confirmRegister from './confirmRegister.js';
import User from './User.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route render={({location}) => (
        <Switch location={location}>
          <Route exact path="/" component={MainPage} /> 
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Register" component={Register}/>
          <Route exact path="/confirmRegistration" component={confirmRegister}/>
          <Route exact path="/User" component={User}/>
        </Switch>
      )}>
      </Route>
    </div>
  );
}

export default App;
