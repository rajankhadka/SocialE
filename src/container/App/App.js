import './App.css';

//react-router
import { Route, Switch,BrowserRouter as Router,Redirect } from "react-router-dom";

//importing components
import LoginRegisterUI from '../../components/UI/LoginRegisterUI/LoginRegisterUI';
import HomePage from "../../pages/HomePage/HomePage";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route  path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginRegisterUI} />
      </Switch>
      
    </Router>
  );
}

export default App;
