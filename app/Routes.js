import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import {Link} from 'react-router-dom'
import CollectionsPage from './containers/CollectionsPage';
import PaysPage from './containers/PaysPage'


export default () => (
  <App>
    <Switch>
    <Route path='/pays' component={PaysPage} />
      <Route path='/collections' component={CollectionsPage} />
      <Route path='/' component={HomePage}/>
    </Switch>
  </App>
);
