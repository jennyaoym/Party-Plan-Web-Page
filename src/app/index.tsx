import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App as TodoApp } from 'app/containers/App';
import { hot } from 'react-hot-loader';
import { Supplier } from 'app/containers/Supplier';
import { Client } from 'app/containers/Clients';
import { Events } from 'app/containers/Events';
import { Item } from 'app/containers/Items';
import { Venue } from 'app/containers/Venue';

export const App = hot(module)(() => (
  <Switch>
    <Route exact path="/" component={TodoApp} />
    <Route path="/supplier/" component={Supplier} />
    <Route path="/clients/" component={Client} />
    <Route path="/events/" component={Events} />
    <Route path="/items/" component={Item} />
    <Route path="/venue/" component={Venue} />
  </Switch>
));
