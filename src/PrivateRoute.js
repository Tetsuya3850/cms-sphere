import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthed } from "./helper";

let PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthed()) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

export default PrivateRoute;
