
import Home from "./pages/Home";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import MainHeader from "./layout/Main-Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Project from "./pages/Project";
import NotFound from "./components/error/NotFound";
import Code from "./pages/Code";


const App =  () => {
  return (
      <Router>
        <MainHeader/>
          <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/project" exact component={Project} />
              <Route path="/code/:id" exact component={Code} />
              <Route path="/" exact component={Home} />
              <Route to="/404" component={NotFound} />
              <Redirect to="/404" />
          </Switch>
      </Router>

  );
}

export default App;
