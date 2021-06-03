import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Main from './Components/Main';
import Sucsess from './Components/Sucsess';
import Trial from './Components/Trial';
import { Store } from './Redux/Store';


function App() {
  return (
    <Provider store={Store} >
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact>
              <Main/>
              <Trial/>
            </Route>
            <Route path='/success' >  <Sucsess/> </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
