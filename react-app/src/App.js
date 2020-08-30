import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProviderList from './ProviderList';
import ProviderEdit from './ProviderEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={ProviderList}/>
		  <Route path='/providers' exact={true} component={ProviderList}/>
		  <Route path='/providers/:id' component={ProviderEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;