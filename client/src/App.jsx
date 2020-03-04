import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./component/Common/Header";
import Menubar from "./component/Common/Menubar";
import Home from "./component/Home/Home";
import AddBlog from "./component/Blog/AddBlog";
import Blog from "./component/Blog/Blog";

import SignUp from "./component/Auth/SignUp";
import Login from "./component/Auth/Login";
import PrivateRoute from "./component/Auth/PrivateRoute";
import NotFound from "./component/Error/NotFound";
import "./style.css";

const App = props => {
  return (
    <>
      <Container fluid className="bg">
        <Menubar />
        <Header />
      </Container>

      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <PrivateRoute path="/blog/create" component={AddBlog}></PrivateRoute>
        <PrivateRoute
          path="/blog/view/:category/:user/:id"
          component={Blog}
        ></PrivateRoute>
        <Route path="/auth/signup">
          <SignUp />
        </Route>
        <Route path="/auth/login" render={props => <Login {...props} />} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;
