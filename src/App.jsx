import {Router,Switch,Route,Redirect} from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from './components/login/Login';
import Wallet from "./components/wallet/Wallet";

const history = createBrowserHistory();

function App() {

  if (localStorage.getItem("sc") === null) {
    history.push('/login');
  } else {
    history.push('/wallet');
  }

  return (
    <Router history={history}>
            <div className="router">
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/wallet" component={Wallet} />
                    <Redirect to="/wallet"/>
                </Switch>
            </div>
    </Router>
  );
}

export default App;
