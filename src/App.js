import './App.css';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import TemplatePage from './components/TemplatePage/TemplatePage';

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/templatepage" component={TemplatePage} />
      </Switch>
    </Router>
    
  );
}

export default App;
