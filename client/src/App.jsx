import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./component/Common/Header";
import Menubar from "./component/Common/Menubar";
import Home from "./component/Home/Home";
import AddBlog from "./component/Blog/AddBlog";

import SignUp from "./component/Auth/SignUp";
import Login from "./component/Auth/Login";

import NotFound from "./component/Error/NotFound";

const App = () => {
  // const [state, setState] = useState({
  //   user: [],
  //   isAuth: true,
  //   token: ""
  // });

  // let ls = window.localStorage;

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
        <Route path="/blog/create" exact={true}>
          <AddBlog />
        </Route>
        <Route path="/auth/signup">
          <SignUp />
        </Route>
        <Route path="/auth/login">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;
