import './App.css';

//react-router
import { Route, Switch,BrowserRouter as Router,Redirect } from "react-router-dom";

//importing components
import LoginRegisterUI from '../../components/UI/LoginRegisterUI/LoginRegisterUI';
import HomePage from "../../pages/HomePage/HomePage";
import CreateCampaginPage from '../../pages/CreateCampaginPage/CreateCampaginPage';
import TempaltePage from '../../pages/TemplatePage/TemplatePage';
import CreateTemplatePage from '../../pages/CreateTemplatePage/CreateTemplatePage';
import VerifyYourEmail from '../../pages/VerifyYourEmail/VerifyYourEmail';

function App(props) {
  return (
    <Router>
      <Switch>
        <Route  path="/" exact component={HomePage} />
        <Route path="/home/create-campagin" component={CreateCampaginPage} />
        <Route path="/login" exact component={LoginRegisterUI} />
        <Route path="/home/templates" exact component={TempaltePage} />
        <Route path="/home/create-template" exact component={CreateTemplatePage} />
        <Route path="/forgot-password/verify-your-email" exact component={VerifyYourEmail} />
      </Switch>
      
    </Router>
  );
}

export default App;
