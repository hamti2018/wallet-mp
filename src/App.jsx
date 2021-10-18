import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from './components/login/Login';
import WalletPage from "./components/wallet/Wallet";

const history = createBrowserHistory();


function App() {

  if (localStorage.getItem("sc") === null) {
    history.push('/login');
  } else {
    history.push('/wallet');
  }


  return (

    <BrowserRouter history={history}>
      <div className="router">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/wallet" component={WalletPage}/>
          <Redirect to="/wallet" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
