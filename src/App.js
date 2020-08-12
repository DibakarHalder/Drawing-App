import React, { Suspense, lazy } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import FullScreenLoader from "./Componets/FullScreenLoader";
import "./styles.scss";
import Home from "./Container/Home";
import Canvas from "./Container/Canvas";

const customHistory = createBrowserHistory();

export default function App() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Switch history={customHistory}>
        <Route exact path={"/"} component={(props) => <Home {...props} />} />
        <Route
          exact
          path={"/canvas/:id"}
          component={(props) => <Canvas {...props} />}
        />
      </Switch>
    </Suspense>
  );
}
