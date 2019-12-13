import '@patternfly/react-core/dist/styles/base.css';
import React, { useState } from 'react';
import { Nav, NavItem, NavList } from '@patternfly/react-core';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import FruitList from './FruitList';
import LegumeList from './LegumeList';
import FruitForm from './FruitForm';
import Welcome from './Welcome';
import { Layout } from './layout';

export function getRequestedRoute(): string | undefined {
  const search = window.location.search;
  if (!search) {
    return;
  }
  const requestedRoute = new URLSearchParams(window.location.search).get('route');
  if (requestedRoute) {
    return requestedRoute;
  }
  return;
}

function App() {
  const [active, setActive] = useState(0);
  const PageNav = (
    <Nav aria-label="Nav" theme="dark">
      <NavList>
        <NavItem itemId={0} isActive={active === 0} onClick={() => setActive(0)}>
          <Link to="/">Welcome</Link>
        </NavItem>
        <NavItem itemId={1} isActive={active === 1} onClick={() => setActive(1)}>
          <Link to="/fruitList">Fruit List</Link>
        </NavItem>
        <NavItem itemId={2} isActive={active === 2} onClick={() => setActive(2)}>
          <Link to="/legume">Legume List</Link>
        </NavItem>
        <NavItem itemId={3} isActive={active === 3} onClick={() => setActive(3)}>
          <Link to="/addFruit">Add Fruit</Link>
        </NavItem>
      </NavList>
    </Nav>
  );

  const requestedRoute = getRequestedRoute();
  return (
    <Layout pageNav={PageNav}>
      <Switch>
        <Route path="/fruitList">
          <FruitList />
        </Route>
        <Route path="/legume">
          <LegumeList />
        </Route>
        <Route path="/addFruit">
          <FruitForm />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
      {requestedRoute && <Redirect to={'/' + requestedRoute} />}
    </Layout>
  );
}

export default App;
