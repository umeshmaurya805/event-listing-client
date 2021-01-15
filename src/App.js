import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Event from './Event'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Nav from './Nav';
import Card from './Card';
function App() {
  return (
    <>
    <Router>
        <Switch>    
        <Route path="/New-Event" component={Event} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
          <Route  path="/" component={Home}/>
          </Switch>
        </Router>
    </>
    );
  }
  
  export default App;
  