
import Home from "./pages/Home";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom";
import MainHeader from "./layout/Main-Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchView from "./pages/SearchView";
import NotFound from "./components/error/NotFound";
import Code from "./pages/Code";
import Profil from "./pages/Profil";
import AuthService from "./components/Auth/AuthService";
import MyProjects from "./pages/MyProjects";
import ProjectContent from "./pages/ProjectContent";
import MyGroups from "./pages/MyGroups";
import GroupContent from "./pages/GroupContent";


const App =  () => {
    const history = useHistory();
    const logOut = () => {
        AuthService.logout();
        return(
            <Redirect to="/" />
        )
    }
    const RedirectToHome = () => {
        return(
            <Redirect to="/" />
        )
    }
  return (
      <Router>
        <MainHeader/>
          <Switch>
              <Route path="/profil/:id" exact component={Profil} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/project-all/:filters" exact component={SearchView} />
              <Route path="/my-projects" exact component={MyProjects} />
              <Route path="/my-groups" exact component={MyGroups} />
              <Route path="/project/:id" exact component={ProjectContent} />
              <Route path="/group/:id" exact component={GroupContent} />
              <Route path="/code/:id" exact component={Code} />
              <Route path="/logout" exact component={logOut} />
              <Route path="/" exact component={Home} />
              <Route to="/404" component={NotFound} />
              <Redirect to="/404" />
          </Switch>
      </Router>

  );
}

export default App;
